"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface Props {
	text?: string;
	icon?: ReactNode;
	href?: string;
	onClick?: Function;
	textColor?: string;
	bgColor?: string;
	borderColor?: string;
	paddingX?: number;
	paddingY?: number;
	invertColors?: boolean;
}

export default function RoundButton({
	text,
	icon,
	href,
	onClick = () => {},
	textColor = "sky-600",
	bgColor = "transparent",
	borderColor = "sky-600",
	paddingX = 14,
	paddingY = 3,
	invertColors,
}: Props) {
	if (invertColors) {
		const tempBgColor = bgColor === "transparent" ? "white" : bgColor;
		if (borderColor === textColor) {
			borderColor = tempBgColor;
		}

		bgColor = textColor;
		textColor = tempBgColor;
	}

	return (
		<Link href={href ?? "#"}>
			<button
				onClick={() => onClick()}
				className={`flex items-center gap-2 bg-${bgColor} ${
					borderColor && `border border-${borderColor}`
				} text-${textColor} rounded-full px-${paddingX} py-${paddingY} 
                select-none transition-all hover:scale-105 hover:shadow-sm hover:brightness-110`}
			>
				{text && <p>{text}</p>}
				{icon}
			</button>
		</Link>
	);
}
