"use client"
import PageCard from "@/components/Card";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import axios from "axios";
import { makeHeader } from "@/action";
import { DotBackgroundDemo, GridSmallBackgroundDemo } from "@/components/GridSmallBackgroundDemo";

type PageType = {
    slug: string,
    published: boolean,
    title: string,
    content: string,
    _id: {
        "oid": string
    },
};

export default function Home() {
    const [pages, setPages] = useState<PageType[]>([])
    const { push } = useRouter();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            push("/login")
        }
        getUserPages().then(() => "success").catch((err) => console.error(err))
    }, [])

    async function getUserPages() {
        try {
            const token = localStorage.getItem("token");
            if (token === null) {
                push("/login");
                return;
            }
            const headers = makeHeader(token);
            const data = await axios.get("http://127.0.0.1:8000/pages/get-all", {
                headers: headers
            });
            setPages(data.data);
        } catch (err) {
            console.error(err);
        }

    }
    return (
        <main className="flex min-h-screen w-full h-full flex-col p-10 dark:bg-black gap-4 ">
            <Navbar />
            <div className="flex flex-col gap-4 md:flex-row items-center md:justify-center flex-wrap">
                {pages && pages.map((page, i) => {
                    return <PageCard key={i} params={page} />
                })}
            </div>
            <div className="text-center self-center">
                <Separator className="mb-2" />
                Made with &lt;3 by Dhruv & Dhyey
            </div>
        </main>
    )
}
