"use client"
import Editor from "@monaco-editor/react"
import { useEffect, useState } from "react"
import { Converter } from "darkdown-ts"
import { redirect } from "next/navigation"
import axios from "axios"
import { makeHeader } from "@/action"
import { Button } from "@/components/ui/button"
import { ClipboardIcon, Cross2Icon, DownloadIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"

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
  const { push } = useRouter();

  const [page, setPage] = useState<PageType>({} as PageType);
  const [titleChange, setTitleChange] = useState(false)
  const { toast } = useToast();

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

  async function deletePage() {
    const token = localStorage.getItem("token");
    if (token) {
      const headers = makeHeader(token);
      const data = await axios.delete(`http://127.0.0.1:8000/pages/delete-page/${params.id}`, {
        headers: headers
      });
      if (data.status === 200) {
        toast({
          title: "Successfully Deleted",
          description: "Page deleted successfully, you can checkout updated page"
        })
        push("/home");
      } else {
        toast({
          title: "Unexpected error occurred ",
          description: "Page didn't deleted successfully, you can try resubmitting the changes"
        })
      }
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
      if (data.status === 200) {
        toast({
          title: "Successfully Updated",
          description: "Page updated successfully, you can checkout updated page"
        })
      } else {
        toast({
          title: "Unexpected error occurred ",
          description: "Page didn't updated successfully, you can try resubmitting the changes"
        })
      }
      console.log(data.data);
    }
  }

  function copyToClipboard() {
    const username = localStorage.getItem("user");
    navigator.clipboard.writeText(`http://localhost:3000/${username}/${page.slug}`);
    toast({
      title: "Copied to Clipboard",
    })
  }

  const converter = new Converter();
  return (
    <>
      <div className="flex flex-col h-full w-full p-6">
        <div className="flex flex-col justify-between md:items-center p-3 md:flex-row">
          {!titleChange && (<div className="font-bold text-2xl"> {page.title} <Button variant={"ghost"} onClick={() => setTitleChange(true)}> <Pencil1Icon /> </Button></div>)}
          {titleChange && <div className="flex flex-row"> <Input value={page.title} className="rounded-lg h-8" onChange={(e) => setPage({ ...page, title: e.target.value })} /> <Button variant={"ghost"} className="h-8" onClick={() => setTitleChange(false)}><Cross2Icon /> </Button> </div>}
          <div className="flex flex-row gap-2">
            <Button className="w-fit h-fit gap-2" onClick={submitForm}> <DownloadIcon /> Save  </Button>
            <Button className="w-fit h-fit gap-2" variant={"destructive"} onClick={deletePage}> <TrashIcon /> Delete </Button>
          </div>
        </div>
        <div className="flex flex-row p-3 gap-2"> Published: <Switch checked={page.published} onClick={() => setPage({ ...page, published: !page.published })} /> </div>
        <div className="p-3 flex flex-row gap-2 text-neutral-400 hover:text-white w-fit cursor-pointer items-center" onClick={copyToClipboard}> Copy Link <ClipboardIcon /> </div>
        <div className="flex flex-row w-full h-full pt-5 gap-4 ">
          <Editor
            width={"50%"}
            theme="vs-dark"
            value={page.content}
            defaultLanguage="darkdown"
            onChange={(e) => setPage({ ...page, content: e ?? "" })}
            path="main.dd"
            className="h-screen max-h-screen"
          />
          <div className="w-[50%]">
            Preview
            <div className='p-4
                            prose-h1:text-[#ffc799]
                w-fit
                prose-h1:text-2xl prose-h1:font-bold
                prose-li:text-md prose-li:font-thin prose-li:list-disc
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
