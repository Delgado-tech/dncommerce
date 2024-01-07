"use client";

import RoundButton from "@/components/Buttons/RoundButton";
import {
	Dispatch,
	HTMLInputTypeAttribute,
	SetStateAction,
	useState,
} from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { RegexFunctionType } from "@/utils/regex";
import { DncommerceApiClient } from "@/services/dncommerce-api";
import useModal, { modalController } from "../hooks/useModal";
import ModalCreateRegister from "./Modals/ModalCreateRegister";
import ModalUpdateRegister from "./Modals/ModalUpdateRegister";
import ModalDeleteRegisters from "./Modals/ModalDeleteRegisters";
import { ISelectOptions } from "./Form/SelectField";

export interface IInventory {
	table: ITable;
	name: string;
	highlights?: IHighlights[];
}

export interface ITable {
	headers: string[];
	rows: ITableDataRow[];
	config?: string;
}

export interface ITableDataRow {
	data: ITableItem[];
}

export interface ITableItem {
	display?: string;
	value: string | number;
	formAttributes?: ITableItemFormAttributes;
}

interface ITableItemFormAttributes {
	inputId: string;
	type?: HTMLInputTypeAttribute | "textarea" | "selection";
	label?: string;
	selectOptions?: ISelectOptions[];
	rows?: number;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	maxLengthDisplay?: boolean;
	defaultValue?: string | number;
	regex?: RegexFunctionType;
	addOnly?: boolean;
}

interface IHighlights {
	title: string;
	value: string;
	color?: string;
}

interface Props {
	inventory?: IInventory;
	dataUpdater: Dispatch<SetStateAction<boolean>>;
	apiInstance: DncommerceApiClient.HTTPRequests;
}

export default function Inventory({
	inventory,
	dataUpdater,
	apiInstance,
}: Props) {
	const [checkboxes, setCheckboxes] = useState<string[]>([]);

	const { modalList, addModal, closeModal } = useModal();

	const headers = inventory!.table.headers;
	const rows = inventory!.table.rows;
	const layout_shadow = "shadow-md rounded-md";

	function checkboxHandler(
		event: React.MouseEvent<HTMLInputElement, MouseEvent>,
		registerId: string,
	) {
		const checkbox = event.target as HTMLInputElement;

		if (checkbox.checked) {
			setCheckboxes((prevRegisters) => [
				...prevRegisters.filter((id) => id !== registerId),
				registerId,
			]);
		} else {
			setCheckboxes((prevRegisters) =>
				prevRegisters.filter((id) => id !== registerId),
			);
		}
	}

	const getModalUpdateRegister = (registerIndex: number): React.ReactNode => {
		return (
			<ModalUpdateRegister
				key={modalController.getNextId()}
				modalId={modalController.getNextId()}
				row={rows[registerIndex]}
				closeModalHandler={closeModal}
				dataUpdater={dataUpdater}
				apiInstance={apiInstance}
				inventoryName={inventory!.name}
			/>
		);
	};

	const modalCreateRegister: React.ReactNode = (
		<ModalCreateRegister
			key={modalController.getNextId()}
			modalId={modalController.getNextId()}
			row={rows[0]}
			closeModalHandler={closeModal}
			dataUpdater={dataUpdater}
			apiInstance={apiInstance}
			inventoryName={inventory!.name}
		/>
	);

	const modalConfirmDeleteRegisters: React.ReactNode = (
		<ModalDeleteRegisters
			key={modalController.getNextId()}
			modalId={modalController.getNextId()}
			selectedItems={checkboxes}
			setSelectedItems={setCheckboxes}
			closeModalHandler={closeModal}
			dataUpdater={dataUpdater}
			apiInstance={apiInstance}
		/>
	);

	return (
		<section className="w-full bg-zinc-100">
			{modalList.map((modal) => modal)}
			<main className="h-full min-h-screen w-full max-w-[1600px] bg-zinc-50 p-16 opacity-90 lg:p-8 sm:pt-6">
				{inventory ? (
					<>
						<header className="mb-10 flex items-center justify-between gap-8 sm:flex-col">
							<h1 className="text-2xl font-medium text-zinc-600">
								Inventário de {inventory.name}s
							</h1>
							<span>
								<RoundButton
									text={`Adicionar ${inventory.name}`}
									icon={
										<p>
											<FiPlus />
										</p>
									}
									onClick={() => addModal(modalCreateRegister)}
									invertColors
								/>
							</span>
						</header>

						<section className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-10">
							{inventory.highlights &&
								inventory.highlights.map((highlight, index) => (
									<div key={index} className="h-[100px]">
										<h2 className="text-zinc-400">{highlight.title}</h2>
										<p
											className={`text-lg font-semibold ${
												highlight.color ?? "text-sky-600"
											}`}
										>
											{highlight.value}
										</p>
									</div>
								))}
						</section>

						<section className="lg:mt-12 lg:h-max lg:max-h-[90vh] lg:overflow-auto sm:text-sm">
							<table className="w-full border-separate border-spacing-y-4 p-2 text-left tabular-nums">
								<thead className={`text-sky-950`}>
									<tr
										className={`
											sticky top-0 z-50 h-10 w-full
											after:absolute after:-left-2 after:z-[-10] after:h-full after:w-[calc(100%+1rem)] 
											after:bg-zinc-50 after:content-['_']
										`}
									>
										<th colSpan={headers.length + 1} className="py-2">
											<div className="flex items-center gap-8 sm:flex-col sm:items-start sm:gap-4 sm:pb-4">
												<a
													className={`flex select-none items-center gap-2 font-medium ${
														checkboxes.length === 0
															? "text-zinc-300"
															: "cursor-pointer hover:text-red-500"
													} transition-colors`}
												>
													<FiTrash />
													<p
														onClick={() => {
															if (checkboxes.length > 0) {
																addModal(modalConfirmDeleteRegisters);
															}
														}}
													>
														Excluir Registros
													</p>
												</a>
												<p
													className={`select-none font-normal ${
														checkboxes.length === 0
															? "text-zinc-300 "
															: "cursor-pointer underline transition-colors"
													}`}
													onClick={() => {
														const checkboxes: NodeListOf<HTMLInputElement> =
															document.querySelectorAll("input[type='checkbox']");
														checkboxes.forEach((checkbox) => (checkbox.checked = false));
														setCheckboxes([]);
													}}
												>
													Limpar Seleção
												</p>
											</div>
										</th>
									</tr>
									<tr
										className={`sticky top-10 z-40 bg-sky-200 md:hidden sm:top-[5.5rem] ${layout_shadow}`}
									>
										<th className="rounded-bl-md rounded-tl-md px-4 py-2"></th>
										{headers.map((header, index) => (
											<th
												key={index}
												className={`px-4 py-2 ${
													index + 1 >= headers.length && "rounded-br-md rounded-tr-md"
												}`}
											>
												{header}
											</th>
										))}
									</tr>
								</thead>
								<tbody className="md:flex md:flex-col md:gap-8">
									{inventory.table.rows.map((row, index) => (
										<tr
											key={index}
											className={`bg-white ${layout_shadow} cursor-pointer transition-all 
											hover:scale-[101%] hover:bg-zinc-100 md:flex md:flex-col`}
											onClick={(event) => {
												const target = event.target as HTMLElement;
												if (target.classList.contains("checkbox")) return;

												addModal(getModalUpdateRegister(index));
											}}
										>
											<td className="rounded-bl-md rounded-tl-md px-4 py-4 text-center align-middle md:rounded-md md:bg-sky-300 md:px-6 md:text-start">
												<input
													id={`checkbox-${index}`}
													className="checkbox scale-150 cursor-pointer border border-zinc-600 md:scale-[3]"
													type="checkbox"
													onClick={
														(event) => checkboxHandler(event, String(row.data[0].value)) // id value;
													}
												/>
											</td>
											{Object.values(row.data).map((data, index) => {
												return (
													<td
														key={index}
														className={`max-w-[200px] px-4 py-4 md:max-w-none ${
															index + 1 >= row.data.length && "rounded-br-md rounded-tr-md"
														} max-md:min-w-[100px] break-words md:w-full`}
													>
														<span className="hidden max-w-max rounded bg-sky-200 px-2 font-medium text-sky-950 md:block">
															{headers[index]}
														</span>
														<p>{data.display ?? data.value}</p>
													</td>
												);
											})}
										</tr>
									))}
								</tbody>
							</table>
						</section>
					</>
				) : (
					<h1 className="text-2xl font-medium text-zinc-600">
						Inventário não encontrado!
					</h1>
				)}
			</main>
		</section>
	);
}
