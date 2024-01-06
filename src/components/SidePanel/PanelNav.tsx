import PanelItem, {
	Props as IPanelItem,
} from "@/components/SidePanel/PanelItem";
import { usePathname } from "next/navigation";
import Loading from "../Loading";
import { useEffect, useState } from "react";

export interface Props {
	items: IPanelItem[];
	mobileHideSidePanel: Function;
}

export default function PanelNav({ items, mobileHideSidePanel }: Props) {
	const pathname = usePathname();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(false);
	}, [pathname]);

	return (
		<nav>
			{loading && <Loading />}
			<ul>
				{items.map((item, index) => (
					<li
						key={index}
						onClick={() => {
							setLoading(true);
							mobileHideSidePanel();
						}}
					>
						<PanelItem
							title={item.title}
							icon={item.icon}
							href={item.href}
							selected={pathname === item.href && true}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
}
