import { ReactElement, useEffect, useState } from "react";

export interface IUseModal {
	modalList: React.ReactNode[];
	addModal: (modal: React.ReactNode) => void;
	closeModal: (modalId: number) => void;
}

export class modalController {
	private static currentId: number = -1; // when add start in 0;
	private static openedCount: number = 0;

	static getOpenedCount(): number {
		return this.openedCount;
	}

	static getCurrentId(): number {
		return this.currentId;
	}

	static getNextId(): number {
		return this.currentId + 1;
	}

	static resetId(): void {
		this.currentId = -1;
	}

	static add(): void {
		this.currentId = this.getNextId();
		this.openedCount += 1;
	}

	static close(): void {
		this.openedCount -= 1;

		if (this.openedCount <= 0) {
			this.openedCount = 0;
			this.resetId();
		}
	}
}

function openModalAnimation(modalId: number, callback?: Function) {
	const modalOutside = document.getElementById(
		`modal#${modalId}`,
	) as HTMLDivElement;

	if (modalOutside) {
		const modalBody = modalOutside.querySelector("#modalBody") as HTMLDivElement;

		modalOutside.classList.remove("opacity-0");

		setTimeout(() => {
			modalBody.classList.replace("opacity-0", "opacity-100");
			modalBody.classList.replace("translate-y-[100%]", "translate-y-[0%]");

			if (callback) setTimeout(() => callback(), 300);
		}, 150);
	}
}

function closeModalAnimation(modalId: number, callback?: Function) {
	const modalOutside = document.getElementById(
		`modal#${modalId}`,
	) as HTMLDivElement;

	if (modalOutside) {
		const modalBody = modalOutside.querySelector("#modalBody") as HTMLDivElement;

		modalBody.classList.replace("opacity-100", "opacity-0");
		modalBody.classList.replace("translate-y-[0%]", "translate-y-[100%]");

		setTimeout(() => {
			modalOutside.classList.replace("bg-[rgba(0,0,0,0.5)]", "bg-transparent");
			if (callback) setTimeout(() => callback(), 300);
		}, 100);
	}
}

export default function useModal(): IUseModal {
	const [modalList, setModalList] = useState<React.ReactNode[]>([]);

	useEffect(() => {
		if (modalList.length > 0) openModalAnimation(modalController.getCurrentId());
	}, [modalList]);

	const addModal = (modal: React.ReactNode) => {
		modalController.add();

		if (modalController.getOpenedCount() === 1) {
			document.querySelector("body")?.style.setProperty("overflow", "hidden");
		}

		setModalList((prevList) => [...prevList, modal]);
	};

	const closeModal = (modalId: number) => {
		closeModalAnimation(modalId, () => {
			modalController.close();

			if (modalController.getOpenedCount() <= 0) {
				document.querySelector("body")?.style.setProperty("overflow", "visible");
			}

			setModalList((prevList) =>
				prevList.filter(
					(modal) => (modal as ReactElement).props.modalId !== modalId,
				),
			);
		});
	};

	return {
		modalList,
		addModal,
		closeModal,
	};
}
