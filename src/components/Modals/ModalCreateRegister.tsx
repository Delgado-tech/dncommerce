"use client";

import RoundButton from "../Buttons/RoundButton";
import Modal from "./Modal";
import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import { ITableDataRow } from "../Inventory";
import { Dispatch, SetStateAction, useRef } from "react";
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

export default function ModalCreateRegister({
	modalId,
	row,
	closeModalHandler,
	dataUpdater,
	apiInstance,
	inventoryName,
}: Props) {
	const formRef = useRef<HTMLFormElement>(null);
	const submitButtonRef = useRef<HTMLInputElement>(null);

	const { modalList, addModal, closeModal } = useModal();
	const { invalidInputList, addInvalidInput, removeInvalidInput } =
		useInvalidInput();

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(formRef.current!);
		const formObj = Object.fromEntries(formData.entries());
		apiInstance.create(formObj).then(() => {
			dataUpdater((u) => !u);
		});
	};

	const modalConfirmCreateRegister: React.ReactNode = (
		<ModalConfirm
			key={modalController.getNextId()}
			modalId={modalController.getNextId()}
			title={"Você tem CERTEZA que deseja adicionar esse item?"}
			closeModalHandler={closeModal}
			cancelCta={{
				text: "Cancelar",
				closeModal: true,
				color: "#0284c7",
			}}
			confirmCta={{
				text: "Adicionar",
				action: () => {
					submitButtonRef.current?.click();
				},
				closeModal: true,
				color: "#0284c7",
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
								className={`bg-opacity-85 rounded-md border border-green-200 bg-green-200 px-2 font-bold text-zinc-800 shadow-sm`}
							>
								#
							</span>
							<p>{`Criação do ${inventoryName}`}</p>
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
							if (data.formAttributes.type === "textarea") {
								return (
									<Textarea
										inputId={data.formAttributes.inputId}
										value={String(data.formAttributes.defaultValue || "")}
										label={data.formAttributes.label}
										rows={data.formAttributes.rows}
										minLength={data.formAttributes.minLength}
										maxLength={data.formAttributes.maxLength}
										regex={data.formAttributes.regex}
										required={data.formAttributes.required}
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
										defaultValue={data.formAttributes.defaultValue}
										selectOptions={data.formAttributes.selectOptions}
										key={index}
									/>
								);
							}

							return (
								<Input
									inputId={data.formAttributes.inputId}
									value={String(data.formAttributes.defaultValue || "")}
									type={data.formAttributes.type}
									label={data.formAttributes.label}
									minLength={data.formAttributes.minLength}
									maxLength={data.formAttributes.maxLength}
									regex={data.formAttributes.regex}
									required={data.formAttributes.required}
									addInvalidInputHandler={addInvalidInput}
									removeInvalidInputHandler={removeInvalidInput}
									key={index}
								/>
							);
						})}
					<div className="flex justify-end gap-4">
						<span>
							<RoundButton
								text={"Cancelar"}
								textColor="#71717a"
								borderEqualsText
								onClick={() => closeModalHandler(modalId)}
							/>
						</span>
						<RoundButton
							text={"Adicionar"}
							textColor={"#22c55e"}
							borderEqualsText
							onClick={() => addModal(modalConfirmCreateRegister)}
							invertColors
							disabled={invalidInputList.length > 0}
						/>
					</div>
					<input ref={submitButtonRef} type="submit" className="hidden" />
				</form>
			</Modal>
			{modalList.map((modal) => modal)}
		</>
	);
}
