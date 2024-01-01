"use client";

import RoundButton from "@/components/Buttons/RoundButton";
import {
	Dispatch,
	HTMLInputTypeAttribute,
	SetStateAction,
	useEffect,
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

	//#region
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

	function roundedTableBorder(currentIndex: number, lastIndex: number): string {
		let roundBorder = "";
		if (currentIndex >= lastIndex) roundBorder = "rounded-br-md rounded-tr-md";

		return roundBorder;
	}
	//#endregion

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
			<main className="h-full min-h-screen w-full max-w-[1600px] bg-zinc-50 p-16 opacity-90">
				{inventory ? (
					<>
						<header className="mb-10 flex items-center justify-between gap-8">
							<h1 className="text-2xl font-medium text-zinc-600">
								Inventário de {inventory.name}s
							</h1>
							<RoundButton
								text={`Adicionar ${inventory.name}`}
								icon={<FiPlus />}
								onClick={() => addModal(modalCreateRegister)}
								invertColors
							/>
						</header>

						<section className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-10">
							<div className="h-[100px]">
								<h2 className="text-zinc-400">Melhor Vendedor</h2>
								<p className="text-lg font-semibold text-sky-600">
									Leonardo Felipe Camilo Delgado
								</p>
							</div>
							<div className="h-[100px]">
								<h2 className="text-zinc-400">Melhor Vendedor</h2>
								<p className="text-lg font-semibold text-sky-600">
									Leonardo Felipe Camilo Delgado
								</p>
							</div>
							<div className="h-[100px]">
								<h2 className="text-zinc-400">Melhor Vendedor</h2>
								<p className="text-lg font-semibold text-sky-600">
									Leonardo Felipe Camilo Delgado
								</p>
							</div>
						</section>

						<section>
							<table className="w-full border-separate border-spacing-y-4 overflow-x-auto text-left tabular-nums">
								<thead className={`text-sky-950`}>
									<tr className={`sticky top-0 z-50 h-10 bg-zinc-50`}>
										<th colSpan={headers.length + 1} className="px-4 py-2">
											<div className="flex items-center gap-8">
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
									<tr className={`sticky top-10 z-40 bg-sky-200 ${layout_shadow}`}>
										<th className="rounded-bl-md rounded-tl-md px-4 py-2"></th>
										{headers.map((header, index) => (
											<th
												key={index}
												className={`px-4 py-2 ${roundedTableBorder(
													index,
													headers.length - 1,
												)}`}
											>
												{header}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{inventory.table.rows.map((row, index) => (
										<tr
											key={index}
											className={`bg-white ${layout_shadow} cursor-pointer transition-all hover:scale-[101%] hover:bg-zinc-100`}
											onClick={(event) => {
												const target = event.target as HTMLElement;
												if (target.classList.contains("checkbox")) return;

												addModal(getModalUpdateRegister(index));
											}}
										>
											<td className="rounded-bl-md rounded-tl-md px-4 py-4 text-center align-middle">
												<input
													className="checkbox scale-150 cursor-pointer border border-zinc-600"
													type="checkbox"
													onClick={(event) =>
														checkboxHandler(event, String(row.data[0].value) /* id value */)
													}
												/>
											</td>
											{Object.values(row.data).map((data, index) => (
												<td
													key={index}
													className={`max-w-[200px] px-4 py-4 ${roundedTableBorder(
														index,
														rows.length - 1,
													)} max-md:min-w-[100px]`}
												>
													{data.display ?? data.value}
												</td>
											))}
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
