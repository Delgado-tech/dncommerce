import RoundButton from "../Buttons/RoundButton";
import Modal from "./Modal";

interface Props {
	modalId: number;
	selectedItems: string[];
	isActive: boolean;
	setOpenedModal: (modalId: number, isOpen: boolean) => void;
}

export default function ModalDeleteRegister({
	modalId,
	selectedItems,
	isActive,
	setOpenedModal,
}: Props) {
	return (
		<Modal
			modalId={modalId}
			minWidth={400}
			title={
				<>
					Você tem certeza que deseja excluir{" "}
					<span className="text-red-600">PERMANENTEMENTE</span> os registros
					selecionados?
				</>
			}
			isActive={isActive}
			closeModalHandler={(modalId: number) => setOpenedModal(modalId, false)}
		>
			<div className="mb-4 flex flex-col gap-2">
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
			</div>
			<div className="flex justify-end gap-4">
				<RoundButton
					text="Cancelar"
					textColor="#dc2626"
					paddingX={8}
					paddingY={2}
					borderEqualsText
					onClick={() => setOpenedModal(modalId, false)}
				/>
				<RoundButton
					text="Excluir"
					textColor="#dc2626"
					paddingX={8}
					paddingY={2}
					borderEqualsText
					invertColors
				/>
			</div>
		</Modal>
	);
}
