"use client";

import Inventory, { IInventory, ITableDataRow } from "@/components/Inventory";
import {
	DncommerceApiClient as API,
	DncommerceApiClient,
} from "@/services/dncommerce-api";
import { RegexTemplate } from "@/utils/regex";
import { toBRL } from "@/utils/toBRL";

interface Props {
	data: API.IProduct[];
}

export default function ProductInventory({ data }: Props) {
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

	const inventory: IInventory = {
		table: {
			headers,
			rows,
		},
	};

	return (
		<Inventory
			inventory={inventory}
			apiInstance={DncommerceApiClient.Products.Instance()}
		/>
	);
}
