"use client";
import { useEffect, useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const { push } = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      redirect("/home");
    }
  }, []);

  async function login() {
    if (!username || !password) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const data = await axios.post(
        "https://rusty-leaf-backend.shuttleapp.rs/login",
        {
          username,
          password,
        }
      );

      if (data.status === 200) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", username);
        toast({
          title: "Success",
          description: "Successfully logged in!",
        });
        push("/home");
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col p-10 dark:bg-black">
      <div className="flex flex-col p-5 justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center text-4xl font-extrabold">
          Login
        </div>
        <div className="flex flex-col justify-center items-start border-neutral-800 border-[1px] rounded-lg w-[80%] h-full gap-5 p-5 md:w-[60%] lg:w-[50%] xl:w-[40%]">
          <Label htmlFor="username"> Username </Label>
          <Input
            placeholder="Enter Username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Label htmlFor="password"> Password </Label>
          <Input
            type="password"
            placeholder="Enter Password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link
            href="/register"
            className={buttonVariants({ variant: "link" })}
          >
            New User?
          </Link>
          <LoadingButton
            className="self-center"
            onClick={login}
            loading={loading}
          >
            Login
          </LoadingButton>
        </div>
      </div>
      <div className="text-center self-center">
        <Separator className="my-2 self-center" />
        Made with &lt;3 by Dhruv
      </div>
    </main>
  );
}
