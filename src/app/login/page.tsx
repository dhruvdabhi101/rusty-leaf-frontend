import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";

export default function Page() {
    return (
        <>
            <main className="flex min-h-screen flex-col  p-10 dark:bg-black">
                <div className="flex flex-col p-5 justify-center items-center gap-10">
                    <div className="flex flex-col justify-center items-center text-4xl font-extrabold">
                        Login
                    </div>
                    <div className="flex flex-col justify-center items-start border-neutral-800 border-[1px] rounded-lg w-[80%] h-full gap-5 p-5 md:w-[60%] lg:w-[50%] xl:w-[40%]">
                        <Label htmlFor="username"> Username </Label>
                        <Input placeholder="Enter Username" id="username" />
                        <Label htmlFor="password"> Password </Label>
                        <Input placeholder="Enter Password" id="password" />
                        <Link href="/register" className={buttonVariants({variant: "link"})}>New User ?</Link>
                        <Button className="self-center "> Login </Button>
                    </div>
                </div>
            <div className="text-center self-center">
                <Separator className="my-2 self-center"/>
                Made with &lt;3 by Dhruv & Dhyey
            </div>
            </main>
        </>
    )
}
