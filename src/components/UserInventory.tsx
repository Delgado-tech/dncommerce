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
	initialData?: API.IUser[];
}

export default function UserInventory({ initialData }: Props) {
	const [data, setData] = useState<DncommerceApiClient.IUser[]>(
		initialData || [],
	);

	const [dataUpdater, setDataUpdater] = useState<boolean>(false);

	useEffect(() => {
		API.Users.Instance()
			.get()
			.then((res) => setData(res));
	}, [dataUpdater]);

	const headers: string[] = [
		"Id",
		"Nome",
		"CPF",
		"E-mail",
		"Senha",
		"Genero",
		"Nível de Acesso",
	];

	const rows = data.map((user) => {
		return {
			data: [
				{ value: user.id, formAttributes: undefined },
				{
					value: user.name,
					formAttributes: {
						inputId: "name",
						type: "text",
						minLength: 3,
					},
				},
				{
					value: user.cpf,
					formAttributes: {
						inputId: "cpf",
						type: "text",
						regex: RegexTemplate.Cpf,
						minLength: 14,
					},
				},
				{
					value: user.email,
					formAttributes: {
						inputId: "email",
						type: "email",
					},
				},
				{
					value: user.pass,
					display: `********`,
					formAttributes: {
						inputId: "password",
						type: "password",
					},
				},
				{
					value: user.gender,
					formAttributes: {
						inputId: "gender",
						type: "text",
					},
				},
				{
					value: user.access_level,
					formAttributes: {
						inputId: "access_level",
						type: "text",
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
			apiInstance={DncommerceApiClient.Users.Instance()}
			dataUpdater={setDataUpdater}
		/>
	);
}
