import Link from "next/link";

export default function Navbar({ username }: { username: string }) {
    return (
        <>
            <div className="h-full w-full flex flex-row justify-center items-center ">
                <div className="border-neutral-800 border-[1px] w-[95%] rounded-xl p-4 shadow-gray-900 shadow-md flex flex-row justify-between">
                    <div className="font-bold text-lg">
                        <Link href={"/home"}>
                        Rusty-Leaf
                        </Link>
                    </div>
                    <div className="text-lg font-thin">
                        <Link href={"/profile"}>
                            Hello {username ? username : ""}
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}
