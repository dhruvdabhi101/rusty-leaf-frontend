"use client";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { Converter } from "darkdown-ts";
import { redirect } from "next/navigation";
import axios from "axios";
import { makeHeader } from "@/action";
import { DownloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast, useToast } from "@/components/ui/use-toast";
import { LoadingButton } from "@/components/ui/loading-button";

type PageType = {
  slug: string;
  published: boolean;
  title: string;
  content: string;
};

export default function Page() {
  const { toast } = useToast();
  const [page, setPage] = useState<PageType>({} as PageType);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      redirect("/login");
    }
  }, []);

  async function submitForm() {
    if (!page.title || !page.content || !page.slug) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/login");
      return;
    }

    try {
      setLoading(true);
      const headers = makeHeader(token);
      const reqObj = {
        title: page.title,
        content: page.content,
        slug: page.slug,
        published: page.published,
      };

      const data = await axios.post(
        `https://rusty-leaf-backend.shuttleapp.rs//pages/create-page`,
        reqObj,
        { headers }
      );

      const user = localStorage.getItem("user");
      toast({
        title: "Success",
        description: `Page saved successfully at https://rusty-leaf.vercel.app/${user}/${page.slug}`,
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to save page",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const converter = new Converter();
  return (
    <>
      <div className="flex flex-col h-full w-full p-6">
        <div className="flex flex-row justify-between items-center p-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-2 align-middle items-center">
              {" "}
              <div className="text-lg font-semibold">Title:</div>{" "}
              <Input
                value={page.title}
                className="rounded-lg h-8"
                onChange={(e) => setPage({ ...page, title: e.target.value })}
              />{" "}
            </div>
            <div className="flex flex-row gap-2 align-middle items-center">
              {" "}
              <div className="text-lg font-semibold">Slug:</div>{" "}
              <Input
                value={page.slug}
                className="rounded-lg h-8"
                onChange={(e) => setPage({ ...page, slug: e.target.value })}
              />{" "}
            </div>
          </div>
          <LoadingButton
            className="w-fit h-fit gap-2"
            onClick={submitForm}
            loading={loading}
          >
            <DownloadIcon /> Save
          </LoadingButton>
        </div>
        <div className="flex flex-row p-3 gap-3">
          {" "}
          Published:{" "}
          <Switch
            checked={page.published}
            onClick={() => setPage({ ...page, published: !page.published })}
          />{" "}
        </div>
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
          {/* Monaco Editor  */}
          {/* Typescript custom library, darkdown -> HTML parse */}
          <div className="w-[50%]">
            Preview
            <div
              className="p-4
                w-fit
                prose-h1:text-2xl prose-h1:font-bold
                prose-li:text-md prose-li:font-thin
                prose-a:text-neutral-400 prose-a:hover:underline prose-a:italic

                prose-li:list-disc

                tracking-wider leading-7"
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: converter.convertToHtml(page.content ?? ""),
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
