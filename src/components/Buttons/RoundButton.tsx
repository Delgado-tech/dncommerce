"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef } from "react";

interface Props {
	text?: string;
	icon?: ReactNode;
	href?: string;
	onClick?: Function;
	textColor?: string;
	bgColor?: string;
	border?: boolean;
	borderColor?: string;
	paddingX?: number;
	paddingY?: number;
	borderEqualsText?: boolean;
	invertColors?: boolean;
}

export default function RoundButton({
	text,
	icon,
	href,
	onClick = () => {},
	textColor = "#0284c7",
	bgColor = "transparent",
	border = true,
	borderColor = "#0284c7",
	paddingX = 14,
	paddingY = 3,
	borderEqualsText,
	invertColors,
}: Props) {
	if (borderEqualsText) {
		borderColor = textColor;
	}

	if (invertColors) {
		const tempBgColor = bgColor === "transparent" ? "white" : bgColor;
		borderColor = borderColor === "transparent" ? "white" : borderColor;
		if (borderColor === textColor) {
			borderColor = bgColor;
		}

		bgColor = textColor;
		textColor = tempBgColor;
	}

	return (
		<Link href={href ?? "#"}>
			<button
				onClick={() => onClick()}
				className={`flex select-none items-center gap-2 rounded-full transition-all hover:scale-105 hover:shadow-sm hover:brightness-110`}
				style={{
					backgroundColor: bgColor,
					color: textColor,
					border: border ? "1px solid" : "none",
					borderColor: borderColor,
					padding: `${paddingY / 4}rem ${paddingX / 4}rem`,
				}}
			>
				{text && <p>{text}</p>}
				{icon}
			</button>
		</Link>
	);
}
