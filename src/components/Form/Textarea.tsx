"use client";

import { IToggleClass, cssToggleClasses } from "@/utils/cssToggleClasses";
import { RegexFunctionType } from "@/utils/regex";
import { useEffect, useRef, useState } from "react";
import { setInvalidInputIdFunc } from "../Modals/ModalUpdateRegister";

interface Props {
	inputId: string;
	value?: string;
	label?: string;
	rows?: number;
	minLength?: number;
	maxLength?: number;
	maxLengthDisplay?: boolean;
	disabled?: boolean;
	reload?: boolean;
	required?: boolean;
	regex?: RegexFunctionType;
	setInvalidInputId?: setInvalidInputIdFunc;
}

export default function Textarea({
	inputId,
	value = "",
	label = inputId,
	rows = 4,
	minLength,
	maxLength,
	maxLengthDisplay = true,
	disabled = false,
	reload = false,
	required,
	regex,
	setInvalidInputId,
}: Props) {
	const textareaBodyRef = useRef<HTMLDivElement>(null);
	const [invalidData, setInvalidData] = useState<boolean>(false);

	const labelTC: IToggleClass[] = [
		{ firstClass: "top-[9px]", secondClass: "-top-[12px]", conditional: true },
		{ firstClass: "text-base", secondClass: "text-sm", conditional: true },
		{ firstClass: "text-zinc-600", secondClass: "text-sky-400" },
	];

	useEffect(() => {
		const textareaElement = textareaBodyRef.current?.querySelector("textarea");
		const labelElement = textareaBodyRef.current?.querySelector("label");
		const lengthDisplayElement =
			textareaBodyRef.current?.querySelector(".lengthDisplay");
		const spanElement = textareaBodyRef.current?.querySelector(
			".trace",
		) as HTMLSpanElement;

		if (value.length > 0) {
			labelElement?.classList.remove("top-[9px]", "text-base");
			labelElement?.classList.add("-top-[12px]", "text-sm");
		}

		if (textareaElement && minLength) {
			setInvalidData(textareaElement.value.length < minLength);

			if (setInvalidInputId) {
				const isInvalid = textareaElement.value.length < minLength;
				setInvalidInputId(inputId, isInvalid);
			}
		}

		function toggleLabelClasses() {
			if (labelElement && textareaElement) {
				let toggleConditional = false;
				if (textareaElement.value.length === 0) toggleConditional = true;

				cssToggleClasses(labelElement, labelTC, toggleConditional);
			}
		}

		const inputFocusIn = () => {
			textareaBodyRef.current?.style.setProperty("border-color", "#38bdf8");
			spanElement.style.setProperty("--tw-bg-opacity", "1");
			toggleLabelClasses();
		};

		const inputFocusOut = () => {
			spanElement.style.setProperty("--tw-bg-opacity", "0");
			toggleLabelClasses();
		};

		const inputEvent = (event: Event) => {
			const target = event.target as HTMLInputElement;

			if (regex) {
				target.value = regex(target.value);
			}

			if (lengthDisplayElement && maxLength && maxLengthDisplay) {
				lengthDisplayElement.textContent = String(maxLength - target.value.length);
			}
			if (minLength) {
				setInvalidData(target.value.length < minLength);

				if (setInvalidInputId) {
					const isInvalid = target.value.length < minLength;
					setInvalidInputId(inputId, isInvalid);
				}
			}
		};

		const bodyClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;

			if (textareaElement) {
				if (!target.contains(textareaElement)) {
					textareaElement.setSelectionRange(
						textareaElement.value.length,
						textareaElement.value.length,
					);
					textareaElement.focus();
				}
			}
		};

		if (textareaElement) {
			textareaElement.addEventListener("focusin", inputFocusIn);
			textareaElement.addEventListener("focusout", inputFocusOut);
			textareaElement.addEventListener("input", inputEvent);
		}

		if (textareaBodyRef.current) {
			textareaBodyRef.current.addEventListener("click", bodyClick);
			textareaBodyRef.current.style.setProperty(
				"border-color",
				invalidData && !disabled ? "#f87171" : "#a1a1aa",
			);
		}

		return () => {
			if (textareaElement) {
				textareaElement.removeEventListener("input", inputEvent);
				textareaElement.removeEventListener("focusin", inputFocusIn);
				textareaElement.removeEventListener("focusout", inputFocusOut);
			}
			if (textareaBodyRef.current) {
				textareaBodyRef.current.removeEventListener("click", bodyClick);
			}
		};
	}, [disabled, invalidData]);

	useEffect(() => {
		const textareaElement = textareaBodyRef.current?.querySelector("textarea");
		if (textareaElement) {
			textareaElement.value = value || "";
		}

		if (disabled && setInvalidInputId) {
			setInvalidData(false);
			setInvalidInputId(inputId, false);
		}
	}, [disabled, value, reload]);

	return (
		<div className="flex flex-col gap-1">
			<div
				ref={textareaBodyRef}
				className={`relative flex w-full ${
					disabled ? "cursor-default bg-zinc-100" : "cursor-text"
				} ${
					invalidData && "bg-red-50"
				} flex-col gap-1 rounded-md border border-zinc-400`}
			>
				<label
					htmlFor={inputId}
					className={`absolute ${
						value ? "-top-[12px] text-sm" : "top-[9px] text-base"
					} left-[9px] select-none rounded-md px-1 font-medium text-zinc-600 transition-all`}
				>
					<span
						className={`trace relative z-[1] before:absolute before:-left-1 before:top-[10px]
						before:z-[-1] before:h-[1px] before:w-[calc(100%+0.5rem)] before:bg-white before:content-['_']`}
					>
						{label}
					</span>
				</label>
				<textarea
					className="mt-1 w-full resize-none bg-transparent px-3 py-2 outline-none"
					id={inputId}
					name={inputId}
					rows={rows}
					minLength={minLength}
					maxLength={maxLength}
					required={required}
					defaultValue={value}
					disabled={disabled}
				></textarea>
				{maxLengthDisplay && (
					<span className="lengthDisplay select-none px-2 py-1 text-right text-sm text-zinc-600">
						{value ? Number(maxLength) - value.length : maxLength}
					</span>
				)}
			</div>
			{invalidData && !disabled && (
				<p className="text-end text-sm text-red-400">min: 3 caracteres</p>
			)}
		</div>
	);
}
