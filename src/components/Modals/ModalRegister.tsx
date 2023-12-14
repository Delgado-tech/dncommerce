"use client";

import RoundButton from "../Buttons/RoundButton";
import Modal from "./Modal";
import Input from "../Form/Input";
import { RegexTemplate } from "@/utils/regex";
import Textarea from "../Form/Textarea";
import { EModals, ITableDataRow } from "../Inventory";
import { useEffect, useState } from "react";
import ModalConfirm from "./ModalConfirm";
import { OpenedModal } from "@/controllers/modalController";

interface Props {
	modalId: number;
	isActive: boolean;
	row?: ITableDataRow;
	setOpenedModal: (modalId: number, isOpen: boolean) => void;
	isModalActive: (modalId: number) => boolean;
}

export type setInvalidInputIdFunc = (
	inputId: string,
	pushCondition: boolean,
) => void;

export default function ModalRegister({
	modalId,
	isActive,
	row,
	setOpenedModal,
	isModalActive,
}: Props) {
	const [readOnly, setReadOnly] = useState<boolean>(true);
	const [invalidInputsId, setInvalidInputsId] = useState<string[]>([]);

	useEffect(() => {
		console.log(invalidInputsId);
	}, [invalidInputsId]);

	function setInvalidInputId(inputId: string, pushCondition: boolean) {
		if (invalidInputsId) {
			const index = invalidInputsId.findIndex((value) => value === inputId);

			if (index > -1) {
				invalidInputsId.splice(index, 1);
			}

			if (pushCondition) {
				invalidInputsId.push(inputId);
			}

			setInvalidInputsId(invalidInputsId.map((value) => value));
		}
	}

	function closeEditMode() {
		setOpenedModal(EModals.saveRegister, false);
		setReadOnly(true);
	}

	return (
		<>
			<Modal
				modalId={modalId}
				minWidth={400}
				title={
					<>
						<div className="mb-4 flex items-center gap-4">
							<span
								className={`bg-opacity-85 rounded-md border ${
									readOnly
										? "border-sky-200 bg-sky-200"
										: "border-amber-200 bg-amber-200"
								} px-2 font-bold text-zinc-800 shadow-sm`}
							>
								#{row?.data[0].value}
							</span>
							<p>{readOnly ? "Informações do Produto" : "Edição do Produto"}</p>
						</div>
						<hr></hr>
					</>
				}
				isActive={isActive}
				closeModalHandler={(modalId: number) => setOpenedModal(modalId, false)}
				dontCloseOnClickOutside
			>
				<form id={"ItemForm"} className="my-4 flex flex-col gap-6">
					{row &&
						row.data.map((data, index) => {
							if (!data.formAttributes) return;
							if (data.formAttributes.type === "textarea") {
								return (
									<Textarea
										inputId={data.formAttributes.inputId}
										value={String(data.value)}
										label={data.formAttributes.label}
										rows={data.formAttributes.rows}
										minLength={data.formAttributes.minLength}
										maxLength={data.formAttributes.maxLength}
										regex={data.formAttributes.regex}
										required={data.formAttributes.required}
										disabled={readOnly}
										setInvalidInputId={setInvalidInputId}
										key={index}
									/>
								);
							}

							return (
								<Input
									inputId={data.formAttributes.inputId}
									value={String(data.value)}
									type={data.formAttributes.type}
									label={data.formAttributes.label}
									minLength={data.formAttributes.minLength}
									maxLength={data.formAttributes.maxLength}
									regex={data.formAttributes.regex}
									required={data.formAttributes.required}
									disabled={readOnly}
									setInvalidInputId={setInvalidInputId}
									key={index}
								/>
							);
						})}
					<div className="flex justify-end gap-4">
						<RoundButton
							text={readOnly ? "Fechar" : "Cancelar"}
							textColor="#71717a"
							paddingX={8}
							paddingY={2}
							borderEqualsText
							onClick={() => {
								if (readOnly) {
									setOpenedModal(modalId, false);
								} else {
									setReadOnly(true);
								}
							}}
						/>
						{readOnly && (
							<RoundButton
								text={"Excluir"}
								textColor={"#dc2626"}
								paddingX={8}
								paddingY={2}
								borderEqualsText
								onClick={() => {
									setOpenedModal(EModals.deleteRegister, true);
								}}
								invertColors
							/>
						)}
						<RoundButton
							text={readOnly ? "Editar" : "Salvar"}
							textColor={readOnly ? "#d97706" : "#22c55e"}
							paddingX={8}
							paddingY={2}
							borderEqualsText
							onClick={() => {
								if (!readOnly) {
									setOpenedModal(EModals.saveRegister, true);
								} else {
									setReadOnly(false);
								}
							}}
							invertColors
							disabled={!readOnly && invalidInputsId.length > 0}
						/>
					</div>
				</form>
			</Modal>
			<ModalConfirm
				isActive={isModalActive(EModals.saveRegister)}
				modalId={EModals.saveRegister}
				title={"Você tem CERTEZA que deseja salvar as alterações feitas?"}
				setOpenedModal={setOpenedModal}
				cancelCta={{
					text: "Cancelar",
					action: closeEditMode,
					color: "#0284c7",
				}}
				confirmCta={{
					text: "Salvar",
					action: closeEditMode,
					color: "#0284c7",
				}}
			/>
			<ModalConfirm
				isActive={isModalActive(EModals.deleteRegister)}
				modalId={EModals.deleteRegister}
				title={
					<>
						Você tem certeza que deseja excluir{" "}
						<span className="text-red-600">PERMANENTEMENTE</span> o registro
						selecionado?
					</>
				}
				setOpenedModal={setOpenedModal}
				cancelCta={{
					text: "Cancelar",
					action: () => setOpenedModal(EModals.deleteRegister, false),
					color: "#dc2626",
				}}
				confirmCta={{
					text: "Excluir",
					action: () => setOpenedModal(EModals.deleteRegister, false),
					color: "#dc2626",
				}}
			/>
		</>
	);
}
