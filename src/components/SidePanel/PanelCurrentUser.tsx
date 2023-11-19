import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import RoundButton from "../Buttons/RoundButton";

interface Props {
    logoutHref: string
}

export default function PanelCurrentUser({logoutHref}: Props) {
    return (
        <section className="bg-zinc-100 p-4 flex flex-col justify-center items-center absolute w-full bottom-0 left-0">
            <div className="flex items-center gap-4 w-full pb-4">
                <figure className={`bg-sky-600 font-medium text-white w-10 h-10 flex justify-center items-center rounded-full select-none`} >
                    <span>L</span>
                </figure>
                <div className="text-zinc-600">
                    <p className="select-none">id:<span className="select-text">1</span></p>
                    <p className="font-medium">Leonardo Delgado</p>
                </div>
            </div>
            {/* <Link href={logoutHref} className="flex items-center gap-2 border border-sky-600 text-sky-600 rounded-full px-14 py-3 
                hover:border-sky-400 hover:text-sky-400 hover:scale-105 hover:shadow-sm transition-all select-none">
                <p>Log Out</p>
                <FiArrowRight />
            </Link> */}
            <RoundButton text="Log Out" icon={<FiArrowRight />} href={logoutHref} />
        </section>
    );
}