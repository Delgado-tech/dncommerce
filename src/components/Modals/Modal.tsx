"use client";

import { useEffect } from "react";
import { FiX } from "react-icons/fi";

interface Props {
	modalId: number;
	minWidth?: number;
	minHeight?: number;
	title?: string | React.ReactNode;
	dontCloseOnClickOutside?: boolean;
	children: React.ReactNode;
	isActive: boolean;
	closeModalHandler: (modalId: number) => void;
}

export default function Modal({
	modalId,
	minWidth = 250,
	minHeight = 100,
	title,
	isActive,
	dontCloseOnClickOutside = false,
	closeModalHandler,
	children,
}: Props) {
	useEffect(() => {
		const modal = document.querySelector(`#modalId${modalId}`);
		const modalBody = modal?.querySelector(`#modalBody`);

		const outsideModalClick = (event: MouseEvent) => {
			if (dontCloseOnClickOutside) return;
			if (modalBody) {
				if (ModalController.getCurrentOpenModalId() === modalId) {
					if (!modalBody.contains(event.target as Node)) {
						closeModalHandler(modalId);
					}
				}
			}
		};

		function hideOverflow(hide: boolean) {
			const overflowValue = hide ? "hidden" : "visible";
			document.querySelector("body")!.style.setProperty("overflow", overflowValue);
		}

		if (modal && modalBody) {
			document.addEventListener("click", outsideModalClick);
			if (isActive) {
				ModalController.registerOpenModal(modalId);
				modal.classList.remove("hidden");
				hideOverflow(true);

				setTimeout(() => {
					modalBody.classList.replace("translate-y-[100%]", "translate-y-[0%]");
					modalBody.classList.replace("opacity-0", "opacity-100");
				}, 100);
			} else {
				if (ModalController.getCurrentOpenModalId() === modalId) {
					modalBody.classList.replace("translate-y-[0%]", "translate-y-[100%]");
					modalBody.classList.replace("opacity-100", "opacity-0");

					setTimeout(() => {
						ModalController.unregisterOpenModal(modalId);
						modal.classList.add("hidden");
						if (ModalController.getRegistredOpenModals().length === 0) {
							hideOverflow(false);
						}
					}, 200);
				}
			}
		}

		return () => document.removeEventListener("click", outsideModalClick);
	}, [isActive]);

	return (
		<section
			id={`modalId${modalId}`}
			className={`fixed left-0 top-0 z-[999] hidden h-screen w-full bg-[rgba(0,0,0,0.5)]`}
		>
			<div className="flex h-screen items-center justify-center">
				<div
					id={`modalBody`}
					className={`relative translate-y-[100%] transform rounded-md bg-white p-4 opacity-0 shadow-md transition-all`}
					style={{ minWidth: `${minWidth}px`, minHeight: `${minHeight}px` }}
				>
					<header className="relative mb-4 flex gap-8 text-zinc-800">
						<h1 className="w-[95%] font-semibold">{title}</h1>
						<span
							className="absolute right-0 top-0 cursor-pointer"
							onClick={() => closeModalHandler(modalId)}
						>
							<FiX />
						</span>
					</header>
					{children}
				</div>
			</div>
		</section>
	);
}
