"use client";

import { useEffect } from "react";
import RoundButton from "../Buttons/RoundButton";
import Modal from "./Modal";
import InputText from "../Inputs/InputText";

interface Props {
	modalId: number;
	isActive: boolean;
	setOpenedModal: (modalId: number, isOpen: boolean) => void;
}

export default function ModalRegister({
	modalId,
	isActive,
	setOpenedModal,
}: Props) {
	return (
		<Modal
			modalId={modalId}
			minWidth={400}
			title={
				<>
					<div className="mb-4 flex items-center gap-4">
						<span className="bg-opacity-85 rounded-md border border-sky-200 bg-sky-200 px-2 font-bold text-zinc-800 shadow-sm">
							#1
						</span>
						<p>Informações do Produto</p>
					</div>
					<hr></hr>
				</>
			}
			isActive={isActive}
			closeModalHandler={(modalId: number) => setOpenedModal(modalId, false)}
			dontCloseOnClickOutside
		>
			<form id={"ItemForm"} className="my-4 flex flex-col gap-2">
				<InputText inputId={"Nome"} label={"test"} regex={/[^\d]/g} />
				{/* <div className="flex flex-col gap-1">
					<label htmlFor="name" className="font-medium text-zinc-800">
						Descrição:
					</label>
					<div className="relative flex h-min flex-col rounded-md border border-zinc-400 px-2 py-1 ">
						<textarea
							className="w-full resize-none outline-none"
							id={"tarea"}
							name={"desc"}
							rows={4}
						></textarea>
						<span className="text-right text-sm font-medium text-zinc-400">4</span>
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<label htmlFor="price" className="font-medium text-zinc-800">
						Preço:
					</label>
					<input
						type="																																																																																																																																																			"
						className="rounded-md border border-zinc-400 px-2 py-1 outline-none"
						id={"price"}
						name={"price"}
					/>
				</div> */}
				<div className="flex justify-end gap-4">
					{/* <RoundButton
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
				/> */}
				</div>
			</form>
		</Modal>
	);
}
