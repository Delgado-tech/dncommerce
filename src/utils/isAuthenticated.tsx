"use server";

import axios from "axios";
import { cookies, headers } from "next/headers";

interface IAuthenticated {
	status: boolean;
	userId?: number;
	username?: string;
}

export default async function isAuthenticated(): Promise<IAuthenticated> {
	const headersList = headers();
	const host = headersList.get("host");
	const protocol = headersList.get("x-forwarded-proto");

	const { data } = await axios.get(`${protocol}://${host}/api/login`, {
		headers: { token: cookies().get("token")?.value },
	});

	return { status: data.success, userId: data.id, username: data.username };
}
