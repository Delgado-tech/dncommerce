"use client";

interface Props {
	width?: number;
	height?: number;
	children: React.ReactNode;
}

export default function Modal({ width = 250, height = 100, children }: Props) {
	return (
		<section className="fixed left-0 top-0 z-[999] h-screen w-full bg-[rgba(0,0,0,0.1)]">
			<div className="flex h-screen  items-center justify-center">
				<div
					className={`bg-white p-4`}
					style={{ width: `${width}px`, height: `${height}px` }}
				>
					{children}
				</div>
			</div>
		</section>
	);
}
