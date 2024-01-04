import { DncommerceApiClient } from "@/services/dncommerce-api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { redirect } from "next/dist/server/api-utils";

const apiInstance = DncommerceApiClient.Users.Instance();

interface IToken {
	token: number;
	timestamp: number;
}

export async function GET() {
	const cookie = cookies().get("token");

	if (!cookie) {
		return NextResponse.json({ sucess: false });
	}

	const decodeToken = jwt.decode(cookie.value) as IToken;
	const user = await apiInstance.getId(String(decodeToken.token));

	if (user.token_timestamp !== decodeToken.timestamp) {
		return NextResponse.json({ sucess: false });
	}

	return NextResponse.json({ id: user.id, sucess: true }, { status: 200 });
}

export async function POST(req: NextRequest) {
	const { email, pass }: any = await req.json();

	const token = await apiInstance.login(email, pass);

	if (String(token).includes("Error:")) {
		cookies().delete("token");
		return NextResponse.json({
			sucess: false,
			errorMessage: "E-mail ou senha inválidos!",
		});
	}

	const decodeToken = jwt.decode(token) as IToken;

	const user = await apiInstance.getId(String(decodeToken.token));

	if (!user) {
		cookies().delete("token");
		return NextResponse.json({ sucess: false, errorMessage: "Usuário inválido" });
	}

	if (user.access_level) {
		if (user.access_level < 3) {
			cookies().delete("token");
			return NextResponse.json({ sucess: false, errorMessage: "Acesso negado!" });
		}
	}

	return NextResponse.json(
		{ sucess: true },
		{
			status: 200,
			headers: {
				"Set-Cookie": cookies()
					.set("token", token, {
						maxAge: 60 * 60 * 24,
						httpOnly: true,
						sameSite: "strict",
						path: "/",
					})
					.toString(),
			},
		},
	);
}

export async function DELETE() {
	cookies().delete("token");

	return NextResponse.json(
		{ sucess: true },
		{
			status: 200,
		},
	);
}
