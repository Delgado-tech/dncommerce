"use client";

import RoundButton from "@/components/Buttons/RoundButton";
import { useEffect, useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import Modal from "./Modal";

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
    value: any;
}

interface IHighlights {
    title: string;
    value: string;
    color?: string;
}

interface Props {
    inventory?: IInventory;
}

export default function ProductInventory({inventory}: Props) {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const headers = inventory!.table.headers;
    const rows = inventory!.table.rows;
    const layout_shadow = "shadow-md rounded-md";

    useEffect(() => {
        //console.log(selectedItems)
    }, [selectedItems]);

    function checkboxHandler(event: React.MouseEvent<HTMLInputElement, MouseEvent>, selectedItemId: string) {
        const index = selectedItems.findIndex((id) => id === selectedItemId);

        if (index >= 0) {
            selectedItems.splice(index, 1);
        }

        if (event.currentTarget.checked) {
            selectedItems.push(selectedItemId);
        }
    
        setSelectedItems([ ...selectedItems ]);
    }

    function roundedTableBorder(currentIndex: number, lastIndex: number): string {
        let roundBorder = "";
        if (currentIndex >= lastIndex) roundBorder = "rounded-br-md rounded-tr-md";

        return roundBorder;
    }

    return (
        <section className="bg-zinc-100 w-full">
                <Modal>
                    <p>teste</p>
                </Modal>
            <main className="p-16 w-full max-w-[1600px] min-h-screen h-full bg-zinc-50 opacity-90">
                { inventory ? (
                    <>
                    <header className="flex justify-between items-center gap-8 mb-10">
                        <h1 className="text-2xl font-medium text-zinc-600">Inventário de Produtos</h1>
                        <RoundButton text="Adicionar Produto" icon={<FiPlus />} invertColors />
                    </header>

                    <section className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-10">
                        <div className="h-[100px]">
                            <h2 className="text-zinc-400">Melhor Vendedor</h2>
                            <p className="text-sky-600 font-semibold text-lg">Leonardo Felipe Camilo Delgado</p>
                        </div>
                        <div className="h-[100px]">
                            <h2 className="text-zinc-400">Melhor Vendedor</h2>
                            <p className="text-sky-600 font-semibold text-lg">Leonardo Felipe Camilo Delgado</p>
                        </div>
                        <div className="h-[100px]">
                            <h2 className="text-zinc-400">Melhor Vendedor</h2>
                            <p className="text-sky-600 font-semibold text-lg">Leonardo Felipe Camilo Delgado</p>
                        </div>
                    </section>

                    <section>
                        <table className="text-left w-full tabular-nums border-spacing-y-4 border-separate overflow-x-auto">
                            <thead className={`text-sky-950`}>
                                <tr className={`sticky top-0 bg-zinc-50 z-50 h-10`}>
                                    <th colSpan={headers.length + 1} className="px-4 py-2">
                                        <div className="flex gap-8 items-center">
                                            <a className={`font-medium flex items-center gap-2 select-none ${selectedItems.length === 0 ? "text-zinc-300" : "hover:text-red-500 cursor-pointer"} transition-colors`}
                                                //todo onclick modal
                                            > 
                                                <FiTrash /> 
                                                <p>Excluir Registros</p>
                                            </a>
                                            <p className={`font-normal select-none ${selectedItems.length === 0 ? "text-zinc-300 " : "underline cursor-pointer transition-colors"}`}
                                                onClick={() => {
                                                    const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[type='checkbox']");
                                                    checkboxes.forEach((checkbox) => checkbox.checked = false);
                                                    setSelectedItems([]);
                                                }}
                                            >Limpar Seleção</p>
                                        </div>
                                    </th>
                                </tr>
                                <tr className={`sticky top-10 z-40 bg-sky-200 ${layout_shadow}`}>
                                    <th className="px-4 py-2 rounded-bl-md rounded-tl-md"></th>
                                    { headers.map((header, index) => (
                                        <th key={index} className={`px-4 py-2 ${roundedTableBorder(index, headers.length - 1)}`}>{header}</th>
                                        ))}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    inventory.table.rows.map((row, index) => (
                                            <tr key={index} className={`bg-white ${layout_shadow}`}>
                                                <td className="px-4 py-4 rounded-bl-md rounded-tl-md align-middle text-center">
                                                    <input className="scale-150 border border-zinc-600" type="checkbox" onClick={(event) => checkboxHandler(event, row.data[0].value /* id value */)} />
                                                </td>
                                                { Object.values(row.data).map((data, index) => (
                                                    <td key={index} className={`px-4 py-4 max-w-[200px] ${roundedTableBorder(index, rows.length - 1)} max-md:min-w-[100px]`}>{ data.display ?? data.value }</td>
                                                ))}
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </table>
                    </section>
                    </>
                ): (
                    <h1 className="text-2xl font-medium text-zinc-600">Inventário não encontrado!</h1>
                )}
            </main>
        </section>
    )
}