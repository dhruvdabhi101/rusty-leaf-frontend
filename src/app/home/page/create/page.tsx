"use client"
import Editor from "@monaco-editor/react"
import { useEffect, useState } from "react"
import { Converter } from "darkdown-ts"
import { redirect } from "next/navigation"
import axios from "axios"
import { makeHeader } from "@/action"
import { Button } from "@/components/ui/button"
import { Cross2Icon, DownloadIcon, Pencil1Icon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { toast, useToast } from "@/components/ui/use-toast"

type PageType = {
    slug: string,
    published: boolean,
    title: string,
    content: string,
};

export default function Page() {
    const {toast} = useToast();
    const [page, setPage] = useState<PageType>({} as PageType);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            // push("/login");
            redirect("/login");
        }
    }, [])

    async function submitForm() {
        const token = localStorage.getItem("token");
        if (token) {
            const headers = makeHeader(token);
            const reqObj = {
                title: page.title,
                content: page.content,
                slug: page.slug,
                published: page.published
            };
            const data = await axios.post(`http://127.0.0.1:8000/pages/create-page`, reqObj, {
                headers: headers
            });
            const user = localStorage.getItem("user");
            toast({
                title: "Page Saved Successfully",
                description: "Page saved successfully at " + `http://localhost:3000/${user}/${page.slug}`
            })
            console.log(data.data);
        }
    }

    const converter = new Converter();
    return (
        <>
            <div className="flex flex-col h-full w-full p-6">
                <div className="flex flex-row justify-between items-center p-6">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row gap-2 align-middle items-center"> <div className="text-lg font-semibold">Title:</div>  <Input value={page.title} className="rounded-lg h-8" onChange={(e) => setPage({ ...page, title: e.target.value })}/>  </div>
                        <div className="flex flex-row gap-2 align-middle items-center"> <div className="text-lg font-semibold">Slug:</div>  <Input value={page.slug} className="rounded-lg h-8" onChange={(e) => setPage({ ...page, slug: e.target.value })}/>  </div>
                    </div>
                    <Button className="w-fit h-fit gap-2" onClick={submitForm}> Save <DownloadIcon/>  </Button>
                </div>
                <div className="flex flex-row p-3 gap-3"> Published: <Switch checked={page.published} onClick={() => setPage({ ...page, published: !page.published })} /> </div>
                <div className="flex flex-row w-full h-full pt-5 gap-3">
                    <Editor
                        height={"100vh"}
                        width={"50%"}
                        theme="vs-dark"
                        value={page.content}
                        defaultLanguage="darkdown"
                        onChange={(e) => setPage({ ...page, content: e ?? "" })}
                        path="main.dd"
                    />
                    <div className="w-[50%]">
                        Preview
                        <div className='p-4
                w-fit
                prose-h1:text-2xl prose-h1:font-bold
                prose-li:text-md prose-li:font-thin
                prose-a:text-neutral-400 prose-a:hover:underline prose-a:italic
            tracking-wider leading-7'>
                            <p dangerouslySetInnerHTML={{ __html: converter.convertToHtml(page.content ?? "") }}>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
