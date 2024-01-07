"use client";

import Inventory, { IInventory, ITableDataRow } from "@/components/Inventory";
import {
	DncommerceApiClient as API,
	DncommerceApiClient,
} from "@/services/dncommerce-api";
import { RegexTemplate } from "@/utils/regex";
import { toBRL } from "@/utils/toBRL";
import axios from "axios";
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
		axios
			.get(`${window.location.protocol}//${window.location.host}/api/getToken`)
			.then((res) =>
				API.Products.Instance()
					.get(res.data.token)
					.then((res) => setData(res)),
			);
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
					display: `${(Math.round(Number(discount) * 100) / 100).toFixed(2)}%`,
					formAttributes: {
						inputId: "discount",
						type: "text",
						regex: RegexTemplate.Decimal,
						defaultValue: "0.00",
					},
				},
				{
					value: price - (price * Number(discount)) / 100,
					display: toBRL(price - (price * Number(discount)) / 100),
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
	const biggestStock = data.filter((product) => {
		if (product.stock === Math.max(...stocks)) return product;
	})[0];

	const discount = data.map((product) => Number(product.discount) ?? "0.00");
	const biggestDiscount = data.filter((product) => {
		if (product.discount === Number(Math.max(...discount)).toFixed(2))
			return product;
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
				value: `${smallestStock.name} (${smallestStock.stock} uni.)`,
				color: "text-red-500",
			},
			{
				title: "Produto com maior estoque",
				value: `${biggestStock.name} (${biggestStock.stock} uni.)`,
			},
			{
				title: "Produto com maior desconto",
				value: `${biggestDiscount.name} (${biggestDiscount.discount}%)`,
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
