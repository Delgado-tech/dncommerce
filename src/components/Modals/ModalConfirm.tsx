import RoundButton from "../Buttons/RoundButton";
import Modal from "./Modal";

interface Props {
	modalId: number;
	title: string | React.ReactNode;
	content?: string | React.ReactNode;
	confirmCta?: ICtaOptions;
	cancelCta?: ICtaOptions;
	dontCloseOnClickOutside?: boolean;
	isActive: boolean;
	setOpenedModal: (modalId: number, isOpen: boolean) => void;
}

interface ICtaOptions {
	text: string;
	action: ((event: MouseEvent) => void) | (() => void);
	color?: string;
}

export default function ModalConfirm({
	modalId,
	title,
	content,
	confirmCta = { text: "Confirmar", color: "#71717a", action: () => {} },
	cancelCta = { text: "Cancelar", color: "#71717a", action: () => {} },
	dontCloseOnClickOutside = false,
	isActive,
	setOpenedModal,
}: Props) {
	return (
		<Modal
			modalId={modalId}
			minWidth={400}
			title={title}
			isActive={isActive}
			closeModalHandler={(modalId: number) => setOpenedModal(modalId, false)}
			dontCloseOnClickOutside={dontCloseOnClickOutside}
		>
			{content && <div className="mb-4 flex flex-col gap-2">{content}</div>}
			<div className="flex justify-end gap-4">
				<RoundButton
					text={cancelCta.text}
					textColor={cancelCta.color}
					paddingX={8}
					paddingY={2}
					borderEqualsText
					onClick={cancelCta.action}
				/>
				<RoundButton
					text={confirmCta.text}
					textColor={confirmCta.color}
					paddingX={8}
					paddingY={2}
					borderEqualsText
					invertColors
					onClick={confirmCta.action}
				/>
			</div>
		</Modal>
	);
}
