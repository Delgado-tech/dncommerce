import Link from "next/link";

export default function Panel() {
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
