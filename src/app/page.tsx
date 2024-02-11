"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col justify-between p-10 dark:bg-black">
            <div className="flex flex-row justify-end">
                <Link href={"/register"}><Button>Sign Up</Button></Link>
            </div>
            <div className="flex flex-col justify-center items-center gap-7">
                <div className="flex flex-col items-center justify-center gap-5">
                    <p className="font-semibold text-4xl md:text-6xl lg:text-7xl"> Rusty-Leaf </p>
                    <p className="font-light text-gray-400 text-md md:text-xl text-center">Best Way to deploy your darkdown with a single click of a button</p>
                </div>
                <div className="flex flex-col gap-6 md:flex-row">
                    <Button variant={"outline"} className="bg-black hover:text-black hover:bg-white "> Let's Deploy </Button>
                    <Button variant={"ghost"} className="bg-black hover:text-black hover:bg-white">Learn More &rarr;</Button>
                </div>
            </div>

            <div className="flex flex-row justify-center text-sm text-gray-400">
                Made With Love &lt;3 by Dhruv and Dhyey
            </div>

        </main>
    );
}
