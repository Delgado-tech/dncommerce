"use client";

import { IToggleClass, cssToggleClasses } from "@/utils/cssToggleClasses";
import { HTMLInputTypeAttribute, useEffect, useRef } from "react";

interface Props {
	inputId: string;
	type: HTMLInputTypeAttribute;
	label: string;
	minLength?: number;
	maxLength?: number;
	required?: boolean;
	regex?: (value: string) => string;
}

export default function Input({
	inputId,
	type,
	label,
	minLength,
	maxLength,
	required,
	regex,
}: Props) {
	const inputBodyRef = useRef<HTMLDivElement>(null);

	const labelTC: IToggleClass[] = [
		{ firstClass: "top-[9px]", secondClass: "-top-[11px]", conditional: true },
		{ firstClass: "text-base", secondClass: "text-sm", conditional: true },
		{ firstClass: "text-zinc-600", secondClass: "text-sky-400" },
	];

	useEffect(() => {
		const inputElement = inputBodyRef.current?.querySelector("input");
		const labelElement = inputBodyRef.current?.querySelector("label");

		function toggleLabelClasses() {
			console.log(3);
			if (labelElement && inputElement) {
				let toggleConditional = false;
				if (inputElement.value.length === 0) toggleConditional = true;

				cssToggleClasses(labelElement, labelTC, toggleConditional);
			}
		}

		const inputFocusIn = () => toggleLabelClasses();
		const inputFocusOut = () => toggleLabelClasses();
		const inputEvent = (event: Event) => {
			if (regex) {
				const target = event.target as HTMLInputElement;
				target.value = regex(target.value);
			}
		};

		if (inputElement) {
			inputElement.addEventListener("focusin", inputFocusIn);
			inputElement.addEventListener("focusout", inputFocusOut);
			inputElement.addEventListener("input", inputEvent);
		}

		return () => {
			if (inputElement) {
				inputElement.removeEventListener("input", inputEvent);
				inputElement.removeEventListener("focusin", inputFocusIn);
				inputElement.removeEventListener("focusout", inputFocusOut);
			}
		};
	}, []);

	return (
		<div ref={inputBodyRef} className="relative flex flex-col gap-1">
			<label
				htmlFor={inputId}
				className="absolute left-[9px] top-[9px] select-none bg-white px-1 text-base font-medium text-zinc-600 transition-all"
			>
				{label}
			</label>
			<input
				type={type}
				className="rounded-md border border-zinc-400 px-3 py-2 outline-none focus:border-sky-400"
				id={inputId}
				name={inputId}
				minLength={minLength}
				maxLength={maxLength}
				required={required}
			/>
		</div>
	);
}
