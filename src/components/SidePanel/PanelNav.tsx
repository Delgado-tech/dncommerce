import PanelItem, {
	Props as IPanelItem,
} from "@/components/SidePanel/PanelItem";
import { usePathname } from "next/navigation";

export interface Props {
	items: IPanelItem[];
}

export default function PanelNav({ items }: Props) {
	const pathname = usePathname();

	return (
		<nav>
			<ul>
				{items.map((item, index) => (
					<li key={index}>
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
