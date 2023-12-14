"use client";

import { IToggleClass, cssToggleClasses } from "@/utils/cssToggleClasses";
import { RegexFunctionType } from "@/utils/regex";
import {
	Dispatch,
	HTMLInputTypeAttribute,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { setInvalidInputIdFunc } from "../Modals/ModalRegister";

interface Props {
	inputId: string;
	value?: string;
	label?: string;
	type?: HTMLInputTypeAttribute;
	minLength?: number;
	maxLength?: number;
	disabled?: boolean;
	required?: boolean;
	regex?: RegexFunctionType;
	setInvalidInputId?: setInvalidInputIdFunc;
}

export default function Input({
	inputId,
	value,
	type = "text",
	label = inputId,
	minLength,
	maxLength,
	disabled = false,
	required,
	regex,
	setInvalidInputId,
}: Props) {
	const inputBodyRef = useRef<HTMLDivElement>(null);
	const [invalidData, setInvalidData] = useState<boolean>(false);

	const labelTC: IToggleClass[] = [
		{ firstClass: "top-[9px]", secondClass: "-top-[12px]", conditional: true },
		{ firstClass: "text-base", secondClass: "text-sm", conditional: true },
		{ firstClass: "text-zinc-600", secondClass: "text-sky-400" },
	];

	useEffect(() => {
		if (disabled) return;

		const inputElement = inputBodyRef.current?.querySelector("input");
		const labelElement = inputBodyRef.current?.querySelector("label");

		function toggleLabelClasses() {
			if (labelElement && inputElement) {
				let toggleConditional = false;
				if (inputElement.value.length === 0) toggleConditional = true;

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

			if (minLength) {
				setInvalidData(target.value.length < minLength);

				if (setInvalidInputId) {
					const isInvalid = target.value.length < minLength;
					setInvalidInputId(inputId, isInvalid);
				}
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
	}, [disabled, invalidData]);

	useEffect(() => {
		const inputElement = inputBodyRef.current?.querySelector("input");
		if (inputElement) {
			inputElement.value = value || "";
		}
	}, [disabled, value]);

	return (
		<div ref={inputBodyRef} className="relative flex flex-col gap-1">
			<label
				htmlFor={inputId}
				className={`absolute ${
					value ? "-top-[12px] text-sm" : "top-[9px] text-base"
				} left-[9px] select-none rounded-md px-1 font-medium text-zinc-600 transition-all`}
			>
				<span
					className={`relative z-[1] before:absolute before:-left-1 before:top-[11px]
						before:z-[-1] before:h-[1px] before:w-[calc(100%+0.5rem)] ${
							value && "before:bg-white"
						} before:content-['_']`}
				>
					{label}
				</span>
			</label>
			<input
				type={type}
				className={`rounded-md border ${
					invalidData ? "border-red-400 bg-red-50" : "border-zinc-400"
				} px-3 py-2 outline-none focus:border-sky-400 disabled:bg-zinc-100`}
				id={inputId}
				name={inputId}
				minLength={minLength}
				maxLength={maxLength}
				defaultValue={value}
				disabled={disabled}
				required={required}
			/>
			{invalidData && (
				<p className="text-end text-sm text-red-400">min: 3 caracteres</p>
			)}
		</div>
	);
}
