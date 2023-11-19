'use client';

import { FiShoppingBag } from 'react-icons/fi';
import { Props as IPanelItem } from "@/components/SidePanel/PanelItem";
import PanelCurrentUser from "@/components/SidePanel/PanelCurrentUser";
import PanelNav from "@/components/SidePanel/PanelNav";
import Image from 'next/image';

export interface Props {

};

export default function SidePanel({}: Props) {
    const painelItems: IPanelItem[] = [
        {
            title: "Produtos",
            icon: <FiShoppingBag />,
            href: "/panel/products"
        },
        {
            title: "Usuários",
            icon: <FiShoppingBag />,
            href: "/panel/users"
        }
    ];

    return (
        <header className="bg-white w-64 h-screen border-r border-gray-950 border-opacity-10 relative">
            {/* Panel head */}
            <div className="container p-4">
                <div className="flex justify-start items-center gap-4 pb-4">
                    <figure className="w-10">
                        <Image src={"/svg/logo.svg"} alt="logo" width={40} height={40} />
                    </figure>
                    <h1 className="text-lg font-medium text-sky-900">Admin Panel</h1>
                </div>
                <hr />
            </div>
            <PanelNav items={painelItems} />
            <PanelCurrentUser logoutHref="/" />
        </header>
    )
}