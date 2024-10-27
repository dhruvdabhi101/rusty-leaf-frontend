"use client";
import PageCard from "@/components/Card";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { makeHeader } from "@/action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

type idObject = {
  $oid: string;
};
type PageType = {
  slug: string;
  published: boolean;
  title: string;
  content: string;
  _id: idObject;
};

export default function Home() {
  const [pages, setPages] = useState<PageType[]>([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      redirect("/login");
    }
    if (localStorage.getItem("user")) {
      const username = localStorage.getItem("user");
      setUser(username ? username : "");
    }
    getUserPages()
      .then(() => setLoading(false))
      .catch((err) => {
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load pages",
          variant: "destructive",
        });
      });
  }, []);

  async function getUserPages() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        redirect("/login");
        return;
      }
      const headers = makeHeader(token);
      const data = await axios.get(
        "https://rusty-leaf-backend.shuttleapp.rs/pages/get-all",
        { headers }
      );
      setPages(data.data);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to load pages",
        variant: "destructive",
      });
      throw err;
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen w-full h-full flex-col p-10 dark:bg-black gap-4">
      <Navbar username={user} />
      <div className="w-full">
        <Button asChild>
          <Link className="w-fit flex flex-row gap-2" href="/home/page/create">
            <Pencil1Icon />
            Create Page
          </Link>
        </Button>
      </div>
      <div className="self-center grid grid-cols-1 gap-y-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-8 md:gap-4 content-center">
        {pages.map((page, i) => (
          <PageCard key={i} params={page} />
        ))}
      </div>
    </main>
  );
}
