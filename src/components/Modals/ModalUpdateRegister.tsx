"use client";

import RoundButton from "../Buttons/RoundButton";
import Modal from "./Modal";
import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import { ITableDataRow } from "../Inventory";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import ModalConfirm from "./ModalConfirm";
import { DncommerceApiClient } from "@/services/dncommerce-api";
import useModal, { modalController } from "@/hooks/useModal";
import useInvalidInput from "@/hooks/useInvalidInput";
import SelectField from "../Form/SelectField";

interface Props {
	modalId: number;
	row?: ITableDataRow;
	closeModalHandler: (modalId: number) => void;
	dataUpdater: Dispatch<SetStateAction<boolean>>;
	apiInstance: DncommerceApiClient.HTTPRequests;
	inventoryName: string;
}

export default function ModalUpdateRegister({
	modalId,
	row,
	closeModalHandler,
	dataUpdater,
	apiInstance,
	inventoryName,
}: Props) {
	const [readOnly, setReadOnly] = useState<boolean>(true);

	const formRef = useRef<HTMLFormElement>(null);
	const submitButtonRef = useRef<HTMLInputElement>(null);

	const { modalList, addModal, closeModal } = useModal();
	const { invalidInputList, addInvalidInput, removeInvalidInput } =
		useInvalidInput();

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(formRef.current!);
		const formObj = Object.fromEntries(formData.entries());
		apiInstance.update(String(row?.data[0].value), formObj).then(() => {
			dataUpdater((u) => !u);
		});
		closeModalHandler(modalId);
	};

	const deleteItem = () => {
		apiInstance.delete(String(row?.data[0].value)).then(() => {
			dataUpdater((u) => !u);
		});
		closeModalHandler(modalId);
	};

	const modalConfirmUpdateRegister: React.ReactNode = (
		<ModalConfirm
			key={modalController.getNextId()}
			modalId={modalController.getNextId()}
			title={"Você tem CERTEZA que deseja salvar as alterações feitas?"}
			closeModalHandler={closeModal}
			cancelCta={{
				text: "Cancelar",
				closeModal: true,
				color: "#0284c7",
			}}
			confirmCta={{
				text: "Salvar",
				action: () => {
					submitButtonRef.current?.click();
				},
				closeModal: true,
				color: "#0284c7",
			}}
		/>
	);

	const modalConfirmDeleteRegister: React.ReactNode = (
		<ModalConfirm
			key={modalController.getNextId()}
			modalId={modalController.getNextId()}
			title={
				<>
					Você tem certeza que deseja excluir{" "}
					<span className="text-red-600">PERMANENTEMENTE</span> o registro
					selecionado?
				</>
			}
			closeModalHandler={closeModal}
			cancelCta={{
				text: "Cancelar",
				closeModal: true,
				color: "#dc2626",
			}}
			confirmCta={{
				text: "Excluir",
				action: () => deleteItem(),
				closeModal: true,
				color: "#dc2626",
			}}
		/>
	);

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
							<p>
								{readOnly
									? `Informações do ${inventoryName}`
									: `Edição do ${inventoryName}`}
							</p>
						</div>
						<hr></hr>
					</>
				}
				closeModalHandler={closeModalHandler}
				outsideClick
			>
				<form
					ref={formRef}
					onSubmit={onSubmit}
					className="my-4 flex flex-col gap-6"
				>
					{row &&
						row.data.map((data, index) => {
							if (!data.formAttributes) return;
							if (data.formAttributes.addOnly) return;
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
										addInvalidInputHandler={addInvalidInput}
										removeInvalidInputHandler={removeInvalidInput}
										key={index}
									/>
								);
							}

							if (data.formAttributes.type === "selection") {
								return (
									<SelectField
										inputId={data.formAttributes.inputId}
										label={data.formAttributes.label}
										defaultValue={String(data.value)}
										selectOptions={data.formAttributes.selectOptions}
										disabled={readOnly}
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
									addInvalidInputHandler={addInvalidInput}
									removeInvalidInputHandler={removeInvalidInput}
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
									closeModalHandler(modalId);
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
								onClick={() => addModal(modalConfirmDeleteRegister)}
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
									addModal(modalConfirmUpdateRegister);
								} else {
									setReadOnly(false);
								}
							}}
							invertColors
							disabled={!readOnly && invalidInputList.length > 0}
						/>
					</div>
					<input ref={submitButtonRef} type="submit" className="hidden" />
				</form>
			</Modal>
			{modalList.map((modal) => modal)}
		</>
	);
}
