import { Metadata } from "next";
import Login from "@/components/Login/Login";
import { redirect } from "next/navigation";
import isAuthenticated from "@/utils/isAuthenticated";

export const metadata: Metadata = {
	title: "Login",
	description: "Generated by create next app",
};

export default async function LoginPage() {
	if ((await isAuthenticated()).status) redirect("/panel");

	return <Login />;
}
