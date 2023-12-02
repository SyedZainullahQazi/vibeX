"use client"

import Image from "next/image";
import Link from "next/link";
import { SignedIn,SignOutButton } from "@clerk/nextjs";
import { usePathname,useRouter } from "next/navigation";
import { sidebarLinks } from "@/constants";

export default function Bottombar(){
    const pathname=usePathname();
    return (
        <section className="bottombar">
            <div className="bottombar_container">
            {sidebarLinks.map((link) => {
                     const isActive=((pathname.includes(link.route) && link.route.length>1)|| pathname===link.route);
                    return (
                        <Link href={link.route}
                        className={`bottombar_link ${isActive&&'bg-primary-500'}`} 
                        key={link.label}>
                            <Image src={link.imgURL} alt={link.label} width={24} height={24} />
                            <p className="text-subtle-medium text-light-1 max-small:hidden">{link.label.split(/\s+/)[0]}</p>
                        </Link>);
                })
                }
            </div>
        </section>
    );
}
