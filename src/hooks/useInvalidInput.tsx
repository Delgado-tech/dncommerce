import { useState } from "react";

interface IUseInvalidInput {
	invalidInputList: string[];
	addInvalidInput: (inputId: string) => void;
	removeInvalidInput: (inputId: string) => void;
}

export default function useInvalidInput(): IUseInvalidInput {
	const [invalidInputList, setInvalidInputList] = useState<string[]>([]);

	const addInvalidInput = (inputId: string) => {
		if (invalidInputList.includes(inputId)) {
			removeInvalidInput(inputId);
		}
		setInvalidInputList((prevList) => [...prevList, inputId]);
	};

	const removeInvalidInput = (inputId: string) => {
		setInvalidInputList((prevList) =>
			prevList.filter((value) => value !== inputId),
		);
	};

	return {
		invalidInputList,
		addInvalidInput,
		removeInvalidInput,
	};
}
