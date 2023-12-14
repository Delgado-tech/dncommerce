export interface OpenedModal {
	id: number;
	isActive: boolean;
}

export class ModalController {
	private static openedModals: number[] = [];

	static registerOpenModal(modalId: number): void {
		if (!ModalController.openedModals.includes(modalId)) {
			ModalController.openedModals.unshift(modalId);
		}
	}

	static unregisterOpenModal(modalId: number): void {
		const index = ModalController.openedModals.findIndex(
			(mId) => mId === modalId,
		);
		ModalController.openedModals.splice(index, 1);
	}

	static getRegistredOpenModals(): number[] {
		return ModalController.openedModals;
	}

	static getCurrentOpenModalId(): number {
		return ModalController.openedModals[0];
	}
}
