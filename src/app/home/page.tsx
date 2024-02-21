"use client"
import PageCard from "@/components/Card";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { makeHeader } from "@/action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil1Icon } from "@radix-ui/react-icons"


type idObject = {
    "$oid": string
}
type PageType = {
    slug: string,
    published: boolean,
    title: string,
    content: string,
    _id: idObject,
};

export default function Home() {
    const [pages, setPages] = useState<PageType[]>([])
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            redirect("/login")
        }
        getUserPages().then(() => "success").catch((err) => console.error(err))
    }, [])

    async function getUserPages() {
        try {
            const token = localStorage.getItem("token");
            if (token === null) {
                redirect("/login");
            }
            const headers = makeHeader(token);
            const data = await axios.get("http://127.0.0.1:8000/pages/get-all", {
                headers: headers
            });
            setPages(data.data);
            console.log(data.data);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <main className="flex min-h-screen w-full h-full flex-col p-10 dark:bg-black gap-4 ">
            <Navbar />
            <div className="w-full">
                <Button asChild>
                    <Link className="w-fit flex flex-row gap-2 " href={"/home/page/create"} >
                        <Pencil1Icon />
                        Create Page
                    </Link>
                </Button>
            </div>
            <div className="self-center grid grid-cols-1 gap-y-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-8 md:gap-4 content-center">
                {pages && pages.map((page, i) => {
                    return <PageCard key={i} params={page} />
                })}
            </div>
            <div className="text-center self-center">
                <Separator className="mb-2" />
                Made with &lt;3 by Dhruv
            </div>
        </main>
    )
}
