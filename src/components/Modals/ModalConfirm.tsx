import { MouseEventHandler } from "react";
import RoundButton from "../Buttons/RoundButton";
import Modal from "./Modal";

interface Props {
	modalId: number;
	title: string | React.ReactNode;
	content?: string | React.ReactNode;
	confirmCta?: ICtaOptions;
	cancelCta?: ICtaOptions;
	outsideClick?: boolean;
	closeModalHandler: (modalId: number) => void;
}

interface ICtaOptions {
	text: string;
	action?: MouseEventHandler<HTMLButtonElement>;
	color?: string;
	closeModal?: boolean;
}

export default function ModalConfirm({
	modalId,
	title,
	content,
	confirmCta = { text: "Confirmar", color: "#71717a", action: () => {} },
	cancelCta = { text: "Cancelar", color: "#71717a", action: () => {} },
	outsideClick = false,
	closeModalHandler,
}: Props) {
	return (
		<Modal
			modalId={modalId}
			minWidth={400}
			title={title}
			closeModalHandler={closeModalHandler}
			outsideClick={outsideClick}
		>
			{content && <div className="mb-4 flex flex-col gap-2">{content}</div>}
			<div className="flex justify-end gap-4">
				<span>
					<RoundButton
						text={cancelCta.text}
						textColor={cancelCta.color}
						borderEqualsText
						onClick={(event) => {
							if (cancelCta.action) cancelCta.action(event);
							if (cancelCta.closeModal) {
								closeModalHandler(modalId);
							}
						}}
					/>
				</span>
				<span>
					<RoundButton
						text={confirmCta.text}
						textColor={confirmCta.color}
						borderEqualsText
						invertColors
						onClick={(event) => {
							if (confirmCta.action) confirmCta.action(event);
							if (confirmCta.closeModal) {
								closeModalHandler(modalId);
							}
						}}
					/>
				</span>
			</div>
		</Modal>
	);
}
