"use client";

interface Props {
	inputId: string;
	defaultValue?: string | number;
	selectOptions?: ISelectOptions[];
	label?: string;
	disabled?: boolean;
}

export interface ISelectOptions {
	value?: string;
	display?: string;
}

export default function SelectField({
	inputId,
	defaultValue,
	selectOptions = [{ value: "Option1" }],
	label = inputId,
	disabled = false,
}: Props) {
	return (
		<div className="relative flex flex-col gap-1">
			<label
				htmlFor={inputId}
				className={`absolute -top-[12px] left-[9px] select-none rounded-md px-1 text-sm font-medium text-zinc-600 transition-all`}
			>
				<span
					className={`trace relative z-[1] before:absolute before:-left-1 before:top-[11px]
						before:z-[-1] before:h-[1px] before:w-[calc(100%+0.5rem)] before:bg-white
						before:content-['_']`}
				>
					{label}
				</span>
			</label>
			<select
				id={inputId}
				name={inputId}
				className={`cursor-pointer rounded-md border border-zinc-400 px-3 py-2 outline-none focus:border-sky-400 disabled:cursor-default disabled:bg-zinc-100`}
				defaultValue={defaultValue}
				disabled={disabled}
			>
				{selectOptions.map((option, index) => (
					<option key={index} value={option.value}>
						{option.display}
					</option>
				))}
			</select>
		</div>
	);
}
