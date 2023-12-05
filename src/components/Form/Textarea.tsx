"use client";

import { IToggleClass, cssToggleClasses } from "@/utils/cssToggleClasses";
import { useEffect, useRef } from "react";

interface Props {
	inputId: string;
	label: string;
	rows?: number;
	minLength?: number;
	maxLength?: number;
	maxLengthDisplay?: boolean;
	required?: boolean;
	regex?: (value: string) => string;
}

export default function Textarea({
	inputId,
	label,
	rows = 4,
	minLength,
	maxLength,
	maxLengthDisplay = true,
	required,
	regex,
}: Props) {
	const textareaBodyRef = useRef<HTMLDivElement>(null);

	const labelTC: IToggleClass[] = [
		{ firstClass: "top-[9px]", secondClass: "-top-[12px]", conditional: true },
		{ firstClass: "text-base", secondClass: "text-sm", conditional: true },
		{ firstClass: "text-zinc-600", secondClass: "text-sky-400" },
	];

	const textareaTC: IToggleClass[] = [
		{ firstClass: "border-zinc-400", secondClass: "border-sky-400" },
	];

	useEffect(() => {
		const textareaElement = textareaBodyRef.current?.querySelector("textarea");
		const labelElement = textareaBodyRef.current?.querySelector("label");
		const spanElement = textareaBodyRef.current?.querySelector("span");

		function toggleLabelClasses() {
			if (labelElement && textareaElement) {
				let toggleConditional = false;
				if (textareaElement.value.length === 0) toggleConditional = true;

				cssToggleClasses(textareaBodyRef.current!, textareaTC);
				cssToggleClasses(labelElement, labelTC, toggleConditional);
			}
		}

		const inputFocusIn = () => toggleLabelClasses();
		const inputFocusOut = () => toggleLabelClasses();
		const inputEvent = (event: Event) => {
			const target = event.target as HTMLInputElement;
			if (regex) {
				target.value = regex(target.value);
			}

			if (spanElement && maxLength && maxLengthDisplay) {
				spanElement.textContent = String(maxLength - target.value.length);
			}
		};

		if (textareaElement) {
			textareaElement.addEventListener("focusin", inputFocusIn);
			textareaElement.addEventListener("focusout", inputFocusOut);
			textareaElement.addEventListener("input", inputEvent);
		}

		return () => {
			if (textareaElement) {
				textareaElement.removeEventListener("input", inputEvent);
				textareaElement.removeEventListener("focusin", inputFocusIn);
				textareaElement.removeEventListener("focusout", inputFocusOut);
			}
		};
	}, []);

	return (
		<div
			ref={textareaBodyRef}
			className="relative flex w-full flex-col gap-1 rounded-md border border-zinc-400"
		>
			<label
				htmlFor={inputId}
				className="absolute left-[9px] top-[9px] select-none rounded-md bg-white px-1 text-base font-medium text-zinc-600 transition-all"
			>
				{label}
			</label>
			<textarea
				className="w-full resize-none bg-transparent px-3 py-2 outline-none"
				id={inputId}
				name={inputId}
				rows={rows}
				minLength={minLength}
				maxLength={maxLength}
				required={required}
			></textarea>
			{maxLengthDisplay && (
				<span className="px-2 py-1 text-right text-sm text-zinc-600">
					{maxLength}
				</span>
			)}
		</div>
	);
}
