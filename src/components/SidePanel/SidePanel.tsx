"use client";

import { FiInfo, FiMenu, FiShoppingBag, FiX } from "react-icons/fi";
import { Props as IPanelItem } from "@/components/SidePanel/PanelItem";
import PanelCurrentUser from "@/components/SidePanel/PanelCurrentUser";
import PanelNav from "@/components/SidePanel/PanelNav";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import isMobile from "@/utils/isMobile";
import Link from "next/link";

export interface Props {
	userId?: number;
	username?: string;
}

export default function SidePanel({ userId, username }: Props) {
	const headerRef = useRef<HTMLDivElement>(null);
	const [closedSidePanel, setClosedPanel] = useState<boolean>(false);

	useEffect(() => {
		const painelContentDiv = document.querySelector("#panelContent");

		if (window.innerWidth < 640 || isMobile()) {
			if (!closedSidePanel) painelContentDiv?.classList.add("hidden");
		}

		const resizeHandler = (event: UIEvent) => {
			const window = event.target as Window;
			const width = window.innerWidth;
			const widthOuter = window.outerWidth;

			if (width >= 640 && widthOuter >= 640) {
				headerRef.current?.classList.remove("hidden");
				painelContentDiv?.classList.remove("hidden");
			} else {
				if (closedSidePanel) {
					mobileHideSidePanel();
				} else {
					painelContentDiv?.classList.add("hidden");
				}
			}
		};

		window.addEventListener("resize", resizeHandler);

		return () => window.removeEventListener("resize", resizeHandler);
	}, [closedSidePanel]);

	const mobileHideSidePanel = () => {
		if (!isMobile() && window.innerWidth >= 640) return;
		const painelContentDiv = document.querySelector("#panelContent")!;

		headerRef.current?.classList.add("hidden");
		painelContentDiv?.classList.remove("hidden");

		setClosedPanel(true);
	};

	const mobileShowSidePanel = () => {
		const painelContentDiv = document.querySelector("#panelContent");

		headerRef.current?.classList.remove("hidden");
		painelContentDiv?.classList.add("hidden");

		setClosedPanel(false);
	};

	const painelItems: IPanelItem[] = [
		{
			title: "Produtos",
			icon: <FiShoppingBag />,
			href: "/panel/products",
		},
		{
			title: "Usuários",
			icon: <FiShoppingBag />,
			href: "/panel/users",
		},
		{
			title: "Info",
			icon: <FiInfo />,
			href: "/panel",
		},
	];

	return (
		<>
			<header
				ref={headerRef}
				className="fixed h-screen w-64 border-r border-gray-950 border-opacity-10 bg-white sm:w-full"
			>
				{/* Panel head */}
				<div className="container bg-white p-4">
					<div className="flex items-center justify-between pb-4">
						{/* Logo */}
						<Link
							href={"/panel"}
							onClick={() => mobileHideSidePanel()}
							className="flex cursor-pointer select-none items-center justify-start gap-4"
						>
							<figure className="w-10">
								<Image src={"/svg/logo.svg"} alt="logo" width={40} height={40} />
							</figure>
							<h1 className="text-lg font-medium text-sky-900">Admin Panel</h1>
						</Link>
						<span
							className="z-100 fixed right-4 hidden cursor-pointer text-zinc-800 sm:block"
							onClick={() => mobileHideSidePanel()}
						>
							<FiX />
						</span>
					</div>
					<hr />
				</div>
				<PanelNav items={painelItems} mobileHideSidePanel={mobileHideSidePanel} />
				<PanelCurrentUser userId={userId} username={username} />
			</header>
			{closedSidePanel && (
				<p
					className={
						"fixed right-2 top-4 hidden cursor-pointer rounded-full bg-zinc-400 p-2 text-2xl text-white opacity-90 sm:block"
					}
					onClick={() => mobileShowSidePanel()}
				>
					<FiMenu />
				</p>
			)}
		</>
	);
}
