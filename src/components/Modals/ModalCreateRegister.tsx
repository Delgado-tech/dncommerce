"use client";

import RoundButton from "../Buttons/RoundButton";
import Modal from "./Modal";
import Input from "../Form/Input";
import { RegexTemplate } from "@/utils/regex";
import Textarea from "../Form/Textarea";
import { EModals, ITableDataRow } from "../Inventory";
import { useEffect, useRef, useState } from "react";
import ModalConfirm from "./ModalConfirm";
import { OpenedModal } from "@/controllers/modalController";
import { DncommerceApiClient } from "@/services/dncommerce-api";

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

export default function ModalCreateRegister({
	modalId,
	isActive,
	row,
	setOpenedModal,
	isModalActive,
}: Props) {
	const [invalidInputsId, setInvalidInputsId] = useState<string[]>([]);
	const formRef = useRef<HTMLFormElement>(null);
	const submitButtonRef = useRef<HTMLInputElement>(null);

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		alert(1);
		event.preventDefault();
		const formData = new FormData(formRef.current!);
		const formObj = Object.fromEntries(formData.entries());
		console.log(formObj);
	};

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
							<p>{"Criação do Produto"}</p>
						</div>
						<hr></hr>
					</>
				}
				isActive={isActive}
				closeModalHandler={(modalId: number) => setOpenedModal(modalId, false)}
				dontCloseOnClickOutside
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
										setInvalidInputId={setInvalidInputId}
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
									setInvalidInputId={setInvalidInputId}
									key={index}
								/>
							);
						})}
					<div className="flex justify-end gap-4">
						<RoundButton
							text={"Cancelar"}
							textColor="#71717a"
							paddingX={8}
							paddingY={2}
							borderEqualsText
							onClick={() => {
								setOpenedModal(modalId, false);
							}}
						/>
						<RoundButton
							text={"Adicionar"}
							textColor={"#22c55e"}
							paddingX={8}
							paddingY={2}
							borderEqualsText
							onClick={() => {
								setOpenedModal(EModals.confirmCreateRegister, true);
							}}
							invertColors
							disabled={invalidInputsId.length > 0}
						/>
					</div>
					<input ref={submitButtonRef} type="submit" className="hidden" />
				</form>
			</Modal>
			<ModalConfirm
				isActive={isModalActive(EModals.confirmCreateRegister)}
				modalId={EModals.confirmCreateRegister}
				title={"Você tem CERTEZA que deseja adicionar esse item?"}
				setOpenedModal={setOpenedModal}
				cancelCta={{
					text: "Cancelar",
					action: () => setOpenedModal(EModals.confirmCreateRegister, false),
					color: "#0284c7",
				}}
				confirmCta={{
					text: "Adicionar",
					action: () => {
						submitButtonRef.current?.click();
					},
					color: "#0284c7",
				}}
			/>
		</>
	);
}
