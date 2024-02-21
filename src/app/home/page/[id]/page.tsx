"use client"
import Editor from "@monaco-editor/react"
import { useEffect, useState } from "react"
import { Converter } from "darkdown-ts"
import { redirect } from "next/navigation"
import axios from "axios"
import { makeHeader } from "@/action"
import { Button } from "@/components/ui/button"
import { Cross2Icon, Pencil1Icon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

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

export default function Page({ params }: { params: { id: string } }) {

    const [page, setPage] = useState<PageType>({} as PageType);
    const [titleChange, setTitleChange] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            // push("/login");
            redirect("/login");
        }
        getData().then(() => console.log("success")).catch(err => console.error(err));
    }, [])
    async function getData() {
        const token = localStorage.getItem("token");
        if (token) {
            const headers = makeHeader(token);
            const data = await axios.get(`http://127.0.0.1:8000/pages/get-page/${params.id}`, {
                headers: headers
            });
            console.log(data.data);
            setPage(data.data);
        }
    }

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
            const data = await axios.put(`http://127.0.0.1:8000/pages/update-page/${params.id}`, reqObj, {
                headers: headers
            });
            console.log(data.data);
        }
    }

    const converter = new Converter();
    return (
        <>
            <div className="flex flex-col h-full w-full">
                <div className="flex flex-row justify-between items-center p-3">
                    {!titleChange && (<div className="font-bold text-2xl"> {page.title} <Button variant={"ghost"} onClick={() => setTitleChange(true)}> <Pencil1Icon /> </Button></div>)}
                    {titleChange && <div className="flex flex-row"> <Input value={page.title} className="font-bold text-2xl border-[1px] border-white" onChange={(e) => setPage({ ...page, title: e.target.value })} /> <Button variant={"ghost"} onClick={() => setTitleChange(false)}><Cross2Icon /> </Button> </div>}
                    <Button className="w-fit h-fit" onClick={submitForm}> Save </Button>
                </div>
                <div className="flex flex-row p-3 gap-2"> Published: <Switch checked={page.published} onClick={() => setPage({ ...page, published: !page.published })} /> </div>
                <div className="flex flex-row w-full h-full pt-5 gap-4">
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
