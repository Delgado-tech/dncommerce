"use client";

import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

interface Props {
	modalId: number;
	minWidth?: number;
	minHeight?: number;
	title?: string | React.ReactNode;
	outsideClick?: boolean;
	children: React.ReactNode;
	closeModalHandler: (modalId: number) => void;
}

export default function Modal({
	modalId,
	minWidth = 250,
	minHeight = 100,
	title,
	outsideClick = false,
	closeModalHandler,
	children,
}: Props) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const modalOutside = modalRef.current;
		const modalBody = modalOutside?.querySelector(`#modalBody`);

		const outsideModalClick = (event: MouseEvent) => {
			if (outsideClick) return;

			const target = event.target as HTMLElement;

			if (modalBody) {
				if (
					!modalBody.contains(event.target as Node) &&
					!target.classList.contains("hidden")
				) {
					closeModalHandler(modalId);
				}
			}
		};

		if (modalBody && modalOutside) {
			document.addEventListener("click", outsideModalClick);
		}

		return () => document.removeEventListener("click", outsideModalClick);
	});

	return (
		<section
			ref={modalRef}
			id={`modal#${modalId}`}
			className={`fixed left-0 top-0 z-[999] h-screen w-full`}
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
