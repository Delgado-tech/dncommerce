"use client";

import { useEffect, useRef, useState } from "react";
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

interface IModalSize {
	minWidth: number;
	minHeight: number;
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
	const [modalSize, setModalSize] = useState<IModalSize>({
		minWidth: minWidth,
		minHeight: minHeight,
	});

	useEffect(() => {
		const modalOutside = modalRef.current;
		const modalContainer = modalOutside?.querySelector(`#modalContainer`);
		const modalBody = modalOutside?.querySelector(`#modalBody`);

		if (window.innerWidth < 640 || window.outerWidth < 640) {
			setModalSize((prevEntries) => {
				return { ...prevEntries, minWidth: 100 };
			});
		}

		if (window.innerHeight < modalBody!.clientHeight) {
			modalContainer?.classList.replace("items-center", "items-start");
		} else {
			modalContainer?.classList.replace("items-start", "items-center");
		}

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

		const resizeHandler = (event: UIEvent) => {
			const window = event.target as Window;
			const width = window.innerWidth;
			const widthOuter = window.outerWidth;

			const height = window.innerHeight;

			const newMinWidth = width < 640 || widthOuter < 640 ? 100 : minWidth;
			if (height < modalBody!.clientHeight) {
				modalContainer?.classList.replace("items-center", "items-start");
			} else {
				modalContainer?.classList.replace("items-start", "items-center");
			}

			setModalSize((prevEntries) => {
				return { ...prevEntries, minWidth: newMinWidth };
			});
		};

		window.addEventListener("resize", resizeHandler);

		if (modalBody && modalOutside) {
			document.addEventListener("click", outsideModalClick);
		}

		return () => {
			document.removeEventListener("click", outsideModalClick);
			window.removeEventListener("resize", resizeHandler);
		};
	}, []);

	return (
		<section
			ref={modalRef}
			id={`modal#${modalId}`}
			className={`fixed left-0 top-0 z-[999] h-screen w-full bg-[rgba(0,0,0,0.5)] opacity-0`}
		>
			<div
				id={"modalContainer"}
				className="flex h-screen items-center justify-center overflow-auto"
			>
				<div
					id={`modalBody`}
					className={`relative translate-y-[100%] transform rounded-md bg-white p-4 opacity-0 shadow-md transition-all`}
					style={{
						minWidth: `${modalSize.minWidth}px`,
						minHeight: `${modalSize.minHeight}px`,
					}}
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
