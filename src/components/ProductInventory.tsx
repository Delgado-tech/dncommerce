"use client";

import Inventory, { IInventory, ITableDataRow } from "@/components/Inventory";
import {
	DncommerceApiClient as API,
	DncommerceApiClient,
} from "@/services/dncommerce-api";
import { RegexTemplate } from "@/utils/regex";
import { toBRL } from "@/utils/toBRL";
import { useEffect, useState } from "react";

interface Props {
	initialData?: API.IProduct[];
}

export default function ProductInventory({ initialData }: Props) {
	const [data, setData] = useState<DncommerceApiClient.IProduct[]>(
		initialData || [],
	);

	const [dataUpdater, setDataUpdater] = useState<boolean>(false);

	useEffect(() => {
		API.Products.Instance()
			.get()
			.then((res) => setData(res));
	}, [dataUpdater]);

	const headers: string[] = [
		"Id",
		"Nome",
		"Descrição",
		"Preço",
		"Desconto atual",
		"Preço com desconto",
		"Estoque",
	];

	const rows = data.map((product) => {
		const price = product.price ?? 0;
		const discount = product.discount ?? 0;

		return {
			data: [
				{ value: product.id, formAttributes: undefined },
				{
					value: product.name,
					formAttributes: {
						inputId: "name",
						type: "text",
						minLength: 3,
					},
				},
				{
					value: product.description,
					formAttributes: {
						inputId: "description",
						type: "textarea",
						rows: 4,
						minLength: 3,
						maxLength: 256,
					},
				},
				{
					value: price,
					display: toBRL(price),
					formAttributes: {
						inputId: "price",
						type: "text",
						regex: RegexTemplate.Decimal,
						defaultValue: "0.00",
					},
				},
				{
					value: discount,
					display: `${(Math.round(discount * 100) / 100).toFixed(2)}%`,
					formAttributes: {
						inputId: "discount",
						type: "text",
						regex: RegexTemplate.Decimal,
						defaultValue: "0.00",
					},
				},
				{
					value: price - (price * discount) / 100,
					display: toBRL(price - (price * discount) / 100),
					formAttributes: undefined,
					defaultValue: "0.00",
				},
				{
					value: product.stock,
					formAttributes: {
						inputId: "stock",
						type: "text",
						regex: RegexTemplate.Numbers,
						defaultValue: "0",
					},
				},
			],
		} as ITableDataRow;
	});

	const stocks = data.map((product) => product.stock ?? 0);
	const smallestStock = data.filter((product) => {
		if (product.stock === Math.min(...stocks)) return product;
	})[0];

	const inventory: IInventory = {
		table: {
			headers,
			rows,
		},
		name: "Produto",
		highlights: [
			{
				title: "Produto com menor estoque",
				value: `${smallestStock.name} (${smallestStock.stock})`,
			},
		],
	};

	return (
		<Inventory
			inventory={inventory}
			apiInstance={DncommerceApiClient.Products.Instance()}
			dataUpdater={setDataUpdater}
		/>
	);
}
