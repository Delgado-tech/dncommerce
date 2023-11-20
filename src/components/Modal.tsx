interface Props {
    width?: number,
    height?: number,
    children: React.ReactNode
}

export default function Modal({ width = 200, height = 100, children }: Props) {
    return (
        <section className="fixed w-full h-screen z-[999] bg-[rgba(0,0,0,0.1)] top-0 left-0">
            <div>

            <div className={`absolute w-[${width}px] h-[${height}px] bg-white p-4`}>
                {children}
            </div>
            </div>
        </section>
    );
}