"use client";

import RoundButton from "@/components/Buttons/RoundButton";
import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import Modal from "./Modals/Modal";
import ModalDeleteRegister from "./Modals/ModalDeleteRegister";
import ModalRegister from "./Modals/ModalRegister";

export interface IInventory {
	table: ITable;
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

interface ITableItem {
	display?: string;
	value: string | number;
	formAttributes?: ITableItemFormAttributes;
}

interface ITableItemFormAttributes {
	type: HTMLInputTypeAttribute;
	required?: boolean;
	maxLength?: number;
	minLenght?: number;
	mask?: "cpf" | "cel";
}

interface IHighlights {
	title: string;
	value: string;
	color?: string;
}

interface Props {
	inventory?: IInventory;
}

interface OpenedModal {
	id: number;
	isActive: boolean;
}

enum EModals {
	"deleteRegister",
	"registerActions",
}

export default function ProductInventory({ inventory }: Props) {
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [openedModals, setOpenedModals] = useState<OpenedModal[]>([
		{ id: EModals.deleteRegister, isActive: false },
		{ id: EModals.registerActions, isActive: true },
	]);

	function setOpenedModal(modalId: number, isOpen: boolean): void {
		const newOpenedModals = openedModals.map((modal) => {
			if (modal.id === modalId) {
				modal.isActive = isOpen;
			}
			return modal;
		});
		setOpenedModals(newOpenedModals);
	}

	function isModalActive(modalId: number): boolean {
		return openedModals.find((modal) => modal.id === modalId)?.isActive || false;
	}

	//#region
	const headers = inventory!.table.headers;
	const rows = inventory!.table.rows;
	const layout_shadow = "shadow-md rounded-md";

	useEffect(() => {
		//console.log(selectedItems)
	}, [selectedItems]);

	function checkboxHandler(
		event: React.MouseEvent<HTMLInputElement, MouseEvent>,
		selectedItemId: string,
	) {
		const index = selectedItems.findIndex((id) => id === selectedItemId);

		if (index >= 0) {
			selectedItems.splice(index, 1);
		}

		if (event.currentTarget.checked) {
			selectedItems.push(selectedItemId);
		}

		setSelectedItems([...selectedItems]);
	}

	function roundedTableBorder(currentIndex: number, lastIndex: number): string {
		let roundBorder = "";
		if (currentIndex >= lastIndex) roundBorder = "rounded-br-md rounded-tr-md";

		return roundBorder;
	}
	//#endregion

	return (
		<section className="w-full bg-zinc-100">
			<ModalRegister
				modalId={EModals.registerActions}
				isActive={isModalActive(EModals.registerActions)}
				setOpenedModal={setOpenedModal}
			/>
			<ModalDeleteRegister
				modalId={EModals.deleteRegister}
				isActive={isModalActive(EModals.deleteRegister)}
				selectedItems={selectedItems}
				setOpenedModal={setOpenedModal}
			/>

			<main className="h-full min-h-screen w-full max-w-[1600px] bg-zinc-50 p-16 opacity-90">
				{inventory ? (
					<>
						<header className="mb-10 flex items-center justify-between gap-8">
							<h1 className="text-2xl font-medium text-zinc-600">
								Inventário de Produtos
							</h1>
							<RoundButton text="Adicionar Produto" icon={<FiPlus />} invertColors />
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
														selectedItems.length === 0
															? "text-zinc-300"
															: "cursor-pointer hover:text-red-500"
													} transition-colors`}
													//todo onclick modal
												>
													<FiTrash />
													<p
														onClick={() => {
															selectedItems.length > 0 &&
																setOpenedModal(EModals.deleteRegister, true);
														}}
													>
														Excluir Registros
													</p>
												</a>
												<p
													className={`select-none font-normal ${
														selectedItems.length === 0
															? "text-zinc-300 "
															: "cursor-pointer underline transition-colors"
													}`}
													onClick={() => {
														const checkboxes: NodeListOf<HTMLInputElement> =
															document.querySelectorAll("input[type='checkbox']");
														checkboxes.forEach((checkbox) => (checkbox.checked = false));
														setSelectedItems([]);
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
										<tr key={index} className={`bg-white ${layout_shadow}`}>
											<td className="rounded-bl-md rounded-tl-md px-4 py-4 text-center align-middle">
												<input
													className="scale-150 border border-zinc-600"
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
