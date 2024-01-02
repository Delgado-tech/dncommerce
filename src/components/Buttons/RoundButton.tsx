"use client";

import Link from "next/link";
import { MouseEventHandler, ReactNode, useEffect, useRef } from "react";

interface Props {
	text?: string;
	icon?: ReactNode;
	href?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	textColor?: string;
	bgColor?: string;
	border?: boolean;
	borderColor?: string;
	borderEqualsText?: boolean;
	invertColors?: boolean;
	typeSubmit?: boolean;
	disabled?: boolean;
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
	borderEqualsText,
	invertColors,
	disabled = false,
}: Props) {
	if (borderEqualsText) {
		borderColor = textColor;
	}

	if (disabled) {
		bgColor = "#71717a";
		textColor = "white";
		borderColor = "transparent";
		invertColors = false;
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
				onClick={onClick}
				className={`flex cursor-pointer select-none items-center gap-2 rounded-full px-8 py-2 transition-all hover:scale-105 hover:shadow-sm hover:brightness-110 disabled:cursor-not-allowed sm:px-6 sm:text-sm`}
				style={{
					backgroundColor: bgColor,
					color: textColor,
					border: border ? "1px solid" : "none",
					borderColor: borderColor,
				}}
				disabled={disabled}
			>
				{text && <p>{text}</p>}
				{icon}
			</button>
		</Link>
	);
}
