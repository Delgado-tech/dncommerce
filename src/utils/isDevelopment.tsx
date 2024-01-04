import { headers } from "next/headers";

export default function isDevelopment(): boolean {
	const headersList = headers();
	const host = headersList.get("host") || "";

	if (host.includes("localhost:")) return true;

	return false;
}
