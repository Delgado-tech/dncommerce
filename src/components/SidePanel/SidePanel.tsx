"use client";

import { FiMenu, FiShoppingBag, FiX } from "react-icons/fi";
import { Props as IPanelItem } from "@/components/SidePanel/PanelItem";
import PanelCurrentUser from "@/components/SidePanel/PanelCurrentUser";
import PanelNav from "@/components/SidePanel/PanelNav";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface Props {}

export default function SidePanel({}: Props) {
	const headerRef = useRef<HTMLDivElement>(null);
	const [closedSidePanel, setClosedPanel] = useState<boolean>(false);

	function detectMobile() {
		const toMatch = [
			/Android/i,
			/webOS/i,
			/iPhone/i,
			/iPad/i,
			/iPod/i,
			/BlackBerry/i,
			/Windows Phone/i,
		];

		return toMatch.some((toMatchItem) => {
			return navigator.userAgent.match(toMatchItem);
		});
	}

	useEffect(() => {
		const painelContentDiv = document.querySelector("#panelContent");

		if ((!closedSidePanel && window.innerWidth < 640) || detectMobile()) {
			painelContentDiv?.classList.add("hidden");
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
						<div className="flex items-center justify-start gap-4">
							<figure className="w-10">
								<Image src={"/svg/logo.svg"} alt="logo" width={40} height={40} />
							</figure>
							<h1 className="text-lg font-medium text-sky-900">Admin Panel</h1>
						</div>
						<span
							className="z-100 fixed right-4 hidden cursor-pointer text-zinc-800 sm:block"
							onClick={() => mobileHideSidePanel()}
						>
							<FiX />
						</span>
					</div>
					<hr />
				</div>
				<PanelNav items={painelItems} />
				<PanelCurrentUser logoutHref="/" />
			</header>
			{closedSidePanel && (
				<p
					className={
						"fixed ml-2 mt-2 hidden cursor-pointer rounded-full bg-zinc-400 p-2 text-4xl text-white sm:block"
					}
					onClick={() => mobileShowSidePanel()}
				>
					<FiMenu />
				</p>
			)}
		</>
	);
}
