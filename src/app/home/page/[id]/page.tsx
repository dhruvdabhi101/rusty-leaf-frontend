"use client";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { Converter } from "darkdown-ts";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { makeHeader } from "@/action";
import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/button";
import {
  ClipboardIcon,
  Cross2Icon,
  DownloadIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

type PageType = {
  slug: string;
  published: boolean;
  title: string;
  content: string;
  _id: { $oid: string };
};

export default function Page({ params }: { params: { id: string } }) {
  const { push } = useRouter();
  const { toast } = useToast();
  const [page, setPage] = useState<PageType>({} as PageType);
  const [titleChange, setTitleChange] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      redirect("/login");
    }
    getData()
      .then(() => setLoading(false))
      .catch((err) => {
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load page",
          variant: "destructive",
        });
      });
  }, []);

  async function getData() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        redirect("/login");
        return;
      }
      const headers = makeHeader(token);
      const data = await axios.get(
        `https://rusty-leaf-backend.shuttleapp.rs/pages/get-page/${params.id}`,
        { headers }
      );
      setPage(data.data);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to load page",
        variant: "destructive",
      });
      throw err;
    }
  }

  async function deletePage() {
    try {
      setDeleting(true);
      const token = localStorage.getItem("token");
      if (!token) {
        redirect("/login");
        return;
      }
      const headers = makeHeader(token);
      const data = await axios.delete(
        `https://rusty-leaf-backend.shuttleapp.rs/pages/delete-page/${params.id}`,
        { headers }
      );

      toast({
        title: "Success",
        description: "Page deleted successfully",
      });
      push("/home");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to delete page",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  }

  async function submitForm() {
    if (!page.title || !page.content || !page.slug) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      if (!token) {
        redirect("/login");
        return;
      }
      const headers = makeHeader(token);
      const reqObj = {
        title: page.title,
        content: page.content,
        slug: page.slug,
        published: page.published,
      };

      const data = await axios.put(
        `https://rusty-leaf-backend.shuttleapp.rs/pages/update-page/${params.id}`,
        reqObj,
        { headers }
      );

      toast({
        title: "Success",
        description: "Page updated successfully",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to update page",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }
  function copyToClipboard() {
    const username = localStorage.getItem("user");
    navigator.clipboard.writeText(
      `http://rusty-leaf.vercel.app/${username}/${page.slug}`
    );
    toast({
      title: "Copied to Clipboard",
    });
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const converter = new Converter();
  return (
    <>
      <div className="flex flex-col h-full w-full p-6">
        <div className="flex flex-col justify-between md:items-center p-3 md:flex-row">
          {!titleChange && (
            <div className="font-bold text-2xl">
              {" "}
              {page.title}{" "}
              <Button variant={"ghost"} onClick={() => setTitleChange(true)}>
                {" "}
                <Pencil1Icon />{" "}
              </Button>
            </div>
          )}
          {titleChange && (
            <div className="flex flex-row">
              {" "}
              <Input
                value={page.title}
                className="rounded-lg h-8"
                onChange={(e) => setPage({ ...page, title: e.target.value })}
              />{" "}
              <Button
                variant={"ghost"}
                className="h-8"
                onClick={() => setTitleChange(false)}
              >
                <Cross2Icon />{" "}
              </Button>{" "}
            </div>
          )}
          <div className="flex flex-row gap-2">
            <LoadingButton onClick={submitForm} loading={saving}>
              <DownloadIcon className="mr-2" /> Save
            </LoadingButton>
            <LoadingButton
              variant="destructive"
              onClick={deletePage}
              loading={deleting}
            >
              <TrashIcon className="mr-2" /> Delete
            </LoadingButton>
          </div>
        </div>
        <div className="flex flex-row p-3 gap-2">
          {" "}
          Published:{" "}
          <Switch
            checked={page.published}
            onClick={() => setPage({ ...page, published: !page.published })}
          />{" "}
        </div>
        <div
          className="p-3 flex flex-row gap-2 text-neutral-400 hover:text-white w-fit cursor-pointer items-center"
          onClick={copyToClipboard}
        >
          {" "}
          Copy Link <ClipboardIcon />{" "}
        </div>
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
            <div
              className="p-4
                            prose-h1:text-[#ffc799]
                w-fit
                prose-h1:text-2xl prose-h1:font-bold
                prose-li:text-md prose-li:font-thin prose-li:list-disc
                prose-a:text-neutral-400 prose-a:hover:underline prose-a:italic
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
