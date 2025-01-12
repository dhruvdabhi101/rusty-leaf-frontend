"use client"
import { DotBackgroundDemo } from "@/components/GridSmallBackgroundDemo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const { push } = useRouter();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            push("/home")
        }
    }, [])
    return (
        <DotBackgroundDemo>
            <main className="flex min-h-screen flex-col justify-between p-10">
                <div className="flex flex-row justify-end">
                    <Link href={"/register"}><Button>Sign Up</Button></Link>
                </div>
                <div className="flex flex-col justify-center items-center gap-7 w-full h-full">
                    <div className="flex flex-col items-center justify-center gap-5">
                        <p className="font-semibold text-4xl md:text-6xl lg:text-7xl"> Rusty-Leaf </p>
                        <p className="font-light text-gray-400 text-md md:text-xl text-center">Best Way to deploy your darkdown with a single click of a button</p>
                    </div>
                    <div className="flex flex-col gap-6 md:flex-row">
                        <Link href={"/login"}><Button variant={"outline"} className="bg-black hover:text-black hover:bg-white "> Let's Deploy </Button></Link>
                        <Link href={"https://dhruvdabhi101.github.io/darkdown-docs/chapter_1.html"}><Button variant={"ghost"} className="bg-black hover:text-black hover:bg-white">Learn More &rarr;</Button></Link>
                    </div>
                </div>
                <div className="flex flex-row justify-center text-sm text-gray-400">
                    Made With Love &lt;3 by Dhruv
                </div>
            </main>
        </DotBackgroundDemo>
    );
}
