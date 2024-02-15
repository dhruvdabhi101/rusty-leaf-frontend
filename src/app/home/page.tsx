"use client"
import PageCard from "@/components/Card";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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


export default function Home() {
    const { push } = useRouter();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            push("/login")
        }
        getUserPages().then((data) => console.log(data)).catch((err) => console.error(err))
    }, [])

    async function getUserPages() {

        const token = localStorage.getItem("token");
        // get user data
        const userData = await axios.get(`http://127.0.0.1:8000/user/${token}`);
        if (userData.status != 200) {
            console.log("error at userdata");
            return;
        }
    }
    return (
        <main className="flex min-h-screen flex-col p-10 dark:bg-black gap-4 ">
            <Navbar />
            <div className="flex flex-col gap-4 md:flex-row items-center md:justify-center flex-wrap">
                <PageCard />
                <PageCard />
                <PageCard />
                <PageCard />
                <PageCard />
            </div>
            <div className="text-center self-center">
                <Separator className="mb-2" />
                Made with &lt;3 by Dhruv & Dhyey
            </div>
        </main>

    )
}
