"use client";

import { IToggleClass, cssToggleClasses } from "@/utils/cssToggleClasses";
import { RegexFunctionType } from "@/utils/regex";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { setInvalidInputIdFunc } from "../Modals/ModalRegister";

interface Props {
	inputId: string;
	value?: string;
	label?: string;
	rows?: number;
	minLength?: number;
	maxLength?: number;
	maxLengthDisplay?: boolean;
	disabled?: boolean;
	required?: boolean;
	regex?: RegexFunctionType;
	setInvalidInputId?: setInvalidInputIdFunc;
}

export default function Textarea({
	inputId,
	value,
	label = inputId,
	rows = 4,
	minLength,
	maxLength,
	maxLengthDisplay = true,
	disabled = false,
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

	const textareaTC: IToggleClass[] = [
		{ firstClass: "border-zinc-400", secondClass: "border-sky-400" },
	];

	useEffect(() => {
		if (disabled) return;

		const textareaElement = textareaBodyRef.current?.querySelector("textarea");
		const labelElement = textareaBodyRef.current?.querySelector("label");
		const spanElement = textareaBodyRef.current?.querySelector(".lengthDisplay");

		function toggleLabelClasses() {
			if (labelElement && textareaElement) {
				let toggleConditional = false;
				if (textareaElement.value.length === 0) toggleConditional = true;

				cssToggleClasses(labelElement, labelTC, toggleConditional);
			}
		}

		const inputFocusIn = () => {
			textareaBodyRef.current?.style.setProperty("border-color", "#38bdf8");
			toggleLabelClasses();
		};

		const inputFocusOut = () => {
			textareaBodyRef.current?.style.setProperty(
				"border-color",
				invalidData ? "#f87171" : "#a1a1aa",
			);
			toggleLabelClasses();
		};

		const inputEvent = (event: Event) => {
			const target = event.target as HTMLInputElement;

			if (regex) {
				target.value = regex(target.value);
			}

			if (spanElement && maxLength && maxLengthDisplay) {
				spanElement.textContent = String(maxLength - target.value.length);
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
	}, [disabled, value]);

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
						className={`relative z-[1] before:absolute before:-left-1 before:top-[10px]
						before:z-[-1] before:h-[1px] before:w-[calc(100%+0.5rem)] ${
							value && "before:bg-white"
						} before:content-['_']`}
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
			{invalidData && (
				<p className="text-end text-sm text-red-400">min: 3 caracteres</p>
			)}
		</div>
	);
}
