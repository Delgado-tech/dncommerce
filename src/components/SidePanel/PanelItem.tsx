import Link from "next/link";
import { ReactNode } from "react";

export interface Props {
	title: string;
	icon?: ReactNode;
	href?: string;
	selected?: boolean;
}

export default function PanelItem({
	title,
	icon,
	href = "#",
	selected = false,
}: Props) {
	return (
		<Link
			href={href}
			className="relative block select-none p-6 transition-all hover:bg-gray-50"
		>
			<span
				className={`absolute left-0 top-0 h-full w-2 rounded-full bg-sky-600 ${
					!selected && "hidden"
				}`}
			/>
			<div
				className={`${
					!selected ? "text-zinc-600" : "text-sky-600"
				} flex w-min items-center gap-2`}
			>
				{icon}
				<p> {title} </p>
			</div>
		</Link>
	);
}
