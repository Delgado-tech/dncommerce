import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const token = cookies().get("token")?.value || "";

	return NextResponse.json({ token: token }, { status: 200 });
}
