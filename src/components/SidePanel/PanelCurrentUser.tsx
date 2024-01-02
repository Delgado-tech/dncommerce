import { FiArrowRight } from "react-icons/fi";
import RoundButton from "../Buttons/RoundButton";

interface Props {
	logoutHref: string;
}

export default function PanelCurrentUser({ logoutHref }: Props) {
	return (
		<section className="absolute bottom-0 left-0 flex w-full flex-col items-center justify-center bg-zinc-100 p-4">
			<div className="flex w-full items-center gap-4 pb-4">
				<figure
					className={`flex h-10 w-10 select-none items-center justify-center rounded-full bg-sky-600 font-medium text-white`}
				>
					<span>L</span>
				</figure>
				<div className="text-zinc-600">
					<p className="select-none">
						id:<span className="select-text">1</span>
					</p>
					<p className="font-medium">Leonardo Delgado</p>
				</div>
			</div>
			<RoundButton text="Log Out" icon={<FiArrowRight />} href={logoutHref} />
		</section>
	);
}
