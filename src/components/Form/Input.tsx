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
	addInvalidInputHandler?: (inputId: string) => void;
	removeInvalidInputHandler?: (inputId: string) => void;
}

export default function Input({
	inputId,
	value = "",
	type = "text",
	label = inputId,
	minLength,
	maxLength,
	disabled = false,
	required,
	regex,
	addInvalidInputHandler,
	removeInvalidInputHandler,
}: Props) {
	const inputBodyRef = useRef<HTMLDivElement>(null);
	const [invalidData, setInvalidData] = useState<boolean>(false);

	const labelTC: IToggleClass[] = [
		{ firstClass: "top-[9px]", secondClass: "-top-[12px]", conditional: true },
		{ firstClass: "text-base", secondClass: "text-sm", conditional: true },
		{ firstClass: "text-zinc-600", secondClass: "text-sky-400" },
	];

	useEffect(() => {
		const inputElement = inputBodyRef.current?.querySelector("input");
		if (inputElement) {
			inputElement.value = value || "";
		}

		if (disabled && removeInvalidInputHandler) {
			setInvalidData(false);
			removeInvalidInputHandler(inputId);
		}
	}, [disabled, value]);

	useEffect(() => {
		const inputElement = inputBodyRef.current?.querySelector("input");
		const labelElement = inputBodyRef.current?.querySelector("label");
		const spanElement = inputBodyRef.current?.querySelector(
			".trace",
		) as HTMLSpanElement;

		if (inputElement) {
			if (inputElement.value.length > 0) {
				labelElement?.classList.remove("top-[9px]", "text-base");
				labelElement?.classList.add("-top-[12px]", "text-sm");
			} else {
				labelElement?.classList.remove("-top-[12px]", "text-sm");
				labelElement?.classList.add("top-[9px]", "text-base");
			}
		}

		const setInvalid = (condition: boolean) => {
			setInvalidData(condition);

			if (addInvalidInputHandler && removeInvalidInputHandler) {
				if (condition) {
					addInvalidInputHandler(inputId);
				} else {
					removeInvalidInputHandler(inputId);
				}
			}
		};

		if (inputElement && minLength) {
			const isInvalid = inputElement.value.length < minLength;
			setInvalid(isInvalid);
		}

		function toggleLabelClasses() {
			if (labelElement && inputElement) {
				let toggleConditional = false;
				if (inputElement.value.length === 0) toggleConditional = true;

				cssToggleClasses(labelElement, labelTC, toggleConditional);
			}
		}

		const inputFocusIn = () => {
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

			if (minLength) {
				const isInvalid = target.value.length < minLength;
				setInvalid(isInvalid);
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

	return (
		<div ref={inputBodyRef} className="relative flex flex-col gap-1">
			<label
				htmlFor={inputId}
				className={`absolute ${
					value ? "-top-[12px] text-sm" : "top-[9px] text-base"
				} left-[9px] select-none rounded-md px-1 font-medium text-zinc-600 transition-all`}
			>
				<span
					className={`trace relative z-[1] before:absolute before:-left-1 before:top-[11px]
						before:z-[-1] before:h-[1px] before:w-[calc(100%+0.5rem)] before:bg-white
						before:content-['_']`}
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
				<p className="text-end text-sm text-red-400">min: {minLength} caracteres</p>
			)}
		</div>
	);
}
