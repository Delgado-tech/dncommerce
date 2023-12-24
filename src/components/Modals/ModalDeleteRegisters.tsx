import { Dispatch, SetStateAction } from "react";
import RoundButton from "../Buttons/RoundButton";
import Modal from "./Modal";
import ModalConfirm from "./ModalConfirm";
import { DncommerceApiClient } from "@/services/dncommerce-api";

interface Props {
	modalId: number;
	isActive: boolean;
	selectedItems: string[];
	setOpenedModal: (modalId: number, isOpen: boolean) => void;
	setSelectedItems: Dispatch<SetStateAction<string[]>>;
	dataUpdater: Dispatch<SetStateAction<boolean>>;
	apiInstance: DncommerceApiClient.HTTPRequests;
}

export default function ModalDeleteRegisters({
	modalId,
	selectedItems,
	isActive,
	setOpenedModal,
	setSelectedItems,
	dataUpdater,
	apiInstance,
}: Props) {
	function deleteItems() {
		selectedItems.map((item, index) =>
			apiInstance.delete(item).then(() => {
				dataUpdater((u) => !u);

				if (selectedItems.length >= index) {
					setSelectedItems([]);
					setOpenedModal(modalId, false);
				}
			}),
		);
	}

	return (
		<ModalConfirm
			modalId={modalId}
			title={
				<>
					Você tem certeza que deseja excluir{" "}
					<span className="text-red-600">PERMANENTEMENTE</span> os registros
					selecionados?
				</>
			}
			content={
				<>
					<p>Registros a serem excluídos:</p>
					<div className="flex">
						{selectedItems.sort().map((item, index) => {
							const dash = index >= selectedItems.length - 1 ? "" : "-";
							return (
								<p key={index}>
									<span className="bg-opacity-85 rounded-md border border-red-200 bg-red-200 px-2 font-bold text-zinc-800 shadow-sm">
										{item}
									</span>
									<span className="mx-1 text-zinc-500">{dash}</span>
								</p>
							);
						})}
					</div>
				</>
			}
			confirmCta={{
				text: "Excluir",
				color: "#dc2626",
				action: () => deleteItems(),
			}}
			cancelCta={{
				text: "Cancelar",
				color: "#dc2626",
				action: () => setOpenedModal(modalId, false),
			}}
			setOpenedModal={setOpenedModal}
			isActive={isActive}
		/>
	);
}
