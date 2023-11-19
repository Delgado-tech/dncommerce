import Link from "next/link";
import { ReactNode } from "react";

export interface Props {
    title: string;
    icon?: ReactNode;
    href?: string;
    selected?: boolean;
};

export default function PanelItem({ title, icon, href = "#", selected = false }: Props) {
    return (
        <Link href={href} className="p-6 relative block hover:bg-gray-50 transition-all select-none">
            <span className={`w-2 h-full bg-sky-600 absolute top-0 left-0 rounded-full ${!selected && "hidden"}`} />
            <div className={`${!selected ? "text-zinc-600" : "text-sky-600"} flex items-center gap-2 w-min`}> 
                { icon }
                <p> {title} </p>
            </div>
        </Link>
    )
}