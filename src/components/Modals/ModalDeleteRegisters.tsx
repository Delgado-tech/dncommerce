import { Dispatch, SetStateAction, useState } from "react";
import ModalConfirm from "./ModalConfirm";
import { DncommerceApiClient } from "@/services/dncommerce-api";
import axios from "axios";
import Loading from "../Loading";

interface Props {
	modalId: number;
	selectedItems: string[];
	setSelectedItems: Dispatch<SetStateAction<string[]>>;
	closeModalHandler: (modalId: number) => void;
	dataUpdater: Dispatch<SetStateAction<boolean>>;
	apiInstance: DncommerceApiClient.HTTPRequests;
}

export default function ModalDeleteRegisters({
	modalId,
	selectedItems,
	setSelectedItems,
	closeModalHandler,
	dataUpdater,
	apiInstance,
}: Props) {
	const [loading, setLoading] = useState<boolean>(false);

	function deleteItems() {
		setLoading(true);

		const items = [...selectedItems];

		axios
			.get(`${window.location.protocol}//${window.location.host}/api/getToken`)
			.then((res) => deleteItem(items, res.data.token));
	}

	const deleteItem = (items: string[], token: string) => {
		apiInstance
			.delete(items.shift()!, token)
			.then((res) => {
				if (String(res).includes("Error:")) {
					alert(String(res));
				}

				dataUpdater((u) => !u);

				if (items.length === 0 || String(res).includes("Error:")) {
					setLoading(false);
					setSelectedItems([]);
					closeModalHandler(modalId);

					const checkboxes = document.querySelectorAll(
						`input[type=checkbox]`,
					) as NodeListOf<HTMLInputElement>;
					checkboxes.forEach((chx) => (chx.checked = false));

					return false;
				}
				return true;
			})
			.then((res) => {
				if (res) deleteItem(items, token);
			});
	};

	return (
		<>
			{loading && <Loading />}
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
							{selectedItems
								.sort((a, b) => Number(a) - Number(b))
								.map((item, index) => {
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
				closeModalHandler={closeModalHandler}
				cancelCta={{
					text: "Cancelar",
					color: "#dc2626",
					closeModal: true,
				}}
				confirmCta={{
					text: "Excluir",
					color: "#dc2626",
					action: () => deleteItems(),
				}}
			/>
		</>
	);
}
