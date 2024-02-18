"use client"
import { buttonVariants } from "@/components/ui/button"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const { push } = useRouter();
    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            push("/home")
        }
    }, [push])
    return (
            <main className="flex min-h-screen flex-col  p-10 dark:bg-black">
                <div className="flex flex-col p-5 justify-center items-center gap-10">
                    <div className="flex flex-col justify-center items-center text-4xl font-extrabold">
                        Register
                    </div>
                    <div className="flex flex-col justify-center items-start border-neutral-800 border-[1px] rounded-lg w-[100%] sm:w-[80%] h-full gap-5 p-5 md:w-[60%] lg:w-[50%] xl:w-[40%]">
                        <Label htmlFor="username"> Username </Label>
                        <Input placeholder="Enter Username" id="username" />
                        <Label htmlFor="name"> Name </Label>
                        <Input placeholder="Enter Name" id="name" />
                        <Label htmlFor="email"> Email </Label>
                        <Input placeholder="Enter Email" id="email" />
                        <Label htmlFor="password"> Password </Label>
                        <Input placeholder="Enter Password" id="password" />
                        <Link href="/login" className={buttonVariants({ variant: "link" })}>Already a User ?</Link>
                        <Button className="self-center"> Register </Button>
                    </div>
                </div>
                <div className="text-center self-center">
                    <Separator className="my-2 self-center" />
                    Made with &lt;3 by Dhruv & Dhyey
                </div>
            </main>
    )
}
