import { FiArrowRight } from "react-icons/fi";
import RoundButton from "../Buttons/RoundButton";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import Loading from "../Loading";

interface Props {
	userId?: number;
	username?: string;
}

export default function PanelCurrentUser({ userId, username }: Props) {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<section className="absolute bottom-0 left-0 flex w-full flex-col items-center justify-center bg-zinc-100 p-4">
			{loading && <Loading />}
			<div className="flex w-full items-center gap-4 pb-4">
				<figure
					className={`mt-2 flex h-10 w-10 select-none items-center justify-center self-start rounded-full bg-sky-600 font-medium text-white`}
				>
					<span>{username && username[0]}</span>
				</figure>
				<div className="w-[80%] text-zinc-600">
					<p className="select-none">
						id:<span className="select-text">{userId}</span>
					</p>
					<p className="break-words font-medium">{username || ""}</p>
				</div>
			</div>
			<RoundButton
				text="Log Out"
				icon={<FiArrowRight />}
				onClick={() => {
					setLoading(true);
					axios
						.delete(`${window.location.protocol}//${window.location.host}/api/login`)
						.then(() => {
							router.push("/login");
						});
				}}
			/>
		</section>
	);
}
