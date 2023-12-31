import { DncommerceApiClient as API } from "@/services/dncommerce-api";
import { Metadata } from "next";
import UserInventory from "@/components/UserInventory";
import { cookies } from "next/headers";

export const metadata: Metadata = {
	title: "Panel - Users",
	description: "Generated by create next app",
};

export default async function UsersPanelPage() {
	const token = cookies().get("token")?.value || "";
	const users = await API.Users.Instance().get(token);

	return <UserInventory initialData={users} />;
}
