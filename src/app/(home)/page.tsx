import Link from "next/link";

export default function Panel() {
    return (
        <>
            <ul>
                <li><Link href={"/panel/products"}>aaProduct Panel</Link></li>
            </ul>
        </>
    );
}