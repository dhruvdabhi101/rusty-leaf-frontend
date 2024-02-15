import PageCard from "@/components/Card";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";

export default function Home() {
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
