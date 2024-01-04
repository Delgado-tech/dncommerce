import Link from "next/link";

export default function PanelHomePage() {
	return (
		<>
			<ul>
				<li>
					<Link href={"/panel/products"}>Product Panel</Link>
				</li>
			</ul>
		</>
	);
}
