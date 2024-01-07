"use client";

import Inventory, { IInventory, ITableDataRow } from "@/components/Inventory";
import {
	DncommerceApiClient as API,
	DncommerceApiClient,
} from "@/services/dncommerce-api";
import { RegexTemplate } from "@/utils/regex";
import axios from "axios";
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
		axios
			.get(`${window.location.protocol}//${window.location.host}/api/getToken`)
			.then((res) =>
				API.Users.Instance()
					.get(String(res.data.token))
					.then((res) => setData(res)),
			);
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
						addOnly: true,
					},
				},
				{
					value: user.cpf,
					display: `${user.cpf?.substring(0, 3) || "***"}.***.***-${
						user.cpf?.substring(user.cpf.length - 2) || "***"
					}`,
					formAttributes: {
						inputId: "cpf",
						type: "text",
						regex: RegexTemplate.Cpf,
						minLength: 14,
						addOnly: true,
					},
				},
				{
					value: user.email,
					formAttributes: {
						inputId: "email",
						type: "email",
						minLength: 8,
						addOnly: true,
					},
				},
				{
					value: user.pass,
					display: "********",
					formAttributes: {
						inputId: "pass",
						type: "password",
						minLength: 8,
						addOnly: true,
					},
				},
				{
					value: user.gender,
					formAttributes: {
						inputId: "gender",
						type: "selection",
						defaultValue: "null",
						selectOptions: [
							{ value: "M", display: "Masculino" },
							{ value: "F", display: "Feminino" },
							{ value: "null", display: "Não Informar" },
						],
						//addOnly: true,
					},
				},
				{
					value: user.access_level,
					formAttributes: {
						inputId: "access_level",
						type: "selection",
						selectOptions: [
							{ value: "1", display: "Nenhum" },
							{ value: "2", display: "Ler Registros" },
							{ value: "3", display: "Ler e Editar Registros" },
							{ value: "4", display: "Total" },
						],
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
		name: "Usuário",
	};

	return (
		<Inventory
			inventory={inventory}
			apiInstance={DncommerceApiClient.Users.Instance()}
			dataUpdater={setDataUpdater}
		/>
	);
}
