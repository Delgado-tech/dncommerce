"use client";

import RoundButton from "@/components/Buttons/RoundButton";
import { FiPlus } from "react-icons/fi";

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
    const headers = inventory!.table.headers;
    const rows = inventory!.table.rows;
    const layout_shadow = "shadow-md rounded-md";

    function roundedTableBorder(currentIndex: number, lastIndex: number): string {
        let roundBorder = "";
        if (currentIndex >= lastIndex) roundBorder = "rounded-br-md rounded-tr-md";

        return roundBorder;
    }

    return (
        <section className="bg-zinc-100 w-full">
            <main className="p-16 w-full max-w-[1600px] h-screen bg-zinc-50 opacity-90">
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

                    <form className="overflow-x-auto">
                        <table className="text-left w-full tabular-nums border-spacing-y-4 border-separate">
                            <thead className={`bg-sky-200 text-sky-950 ${layout_shadow}`}>
                                <th className="px-4 py-2 rounded-bl-md rounded-tl-md"></th>
                                { headers.map((header, index) => (
                                    <th key={index} className={`px-4 py-2 ${roundedTableBorder(index, headers.length - 1)}`}>{header}</th>
                                ))}
                            </thead>
                            <tbody>
                                {
                                    inventory.table.rows.map((row, index) => (
                                            <tr key={index} className={`bg-white ${layout_shadow}`}>
                                                <td className="px-4 py-4 rounded-bl-md rounded-tl-md align-middle text-center">
                                                    <input className="scale-150 border border-zinc-600" type="checkbox" value={1} />
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
                    </form>
                    </>
                ): (
                    <h1 className="text-2xl font-medium text-zinc-600">Inventário não encontrado!</h1>
                )}
            </main>
        </section>
    )
}