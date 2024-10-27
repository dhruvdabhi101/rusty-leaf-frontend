"use client";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { LoadingButton } from "@/components/ui/loading-button";

export default function Page() {
  const { push } = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      redirect("/home");
    }
  }, []);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    if (!username || !password || !email || !name) {
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
        "https://rusty-leaf-backend.shuttleapp.rs/user",
        {
          username,
          password,
          name,
          email,
        }
      );

      if (data.status === 200) {
        toast({
          title: "Success",
          description: "Account created successfully!",
        });
        push("/login");
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to create account",
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
          Register
        </div>
        <div className="flex flex-col justify-center items-start border-neutral-800 border-[1px] rounded-lg w-[100%] sm:w-[80%] h-full gap-5 p-5 md:w-[60%] lg:w-[50%] xl:w-[40%]">
          <Label htmlFor="username">Username</Label>
          <Input
            placeholder="Enter Username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Label htmlFor="name">Name</Label>
          <Input
            placeholder="Enter Name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Enter Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="Enter Password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link href="/login" className={buttonVariants({ variant: "link" })}>
            Already a User?
          </Link>
          <LoadingButton
            className="self-center"
            onClick={register}
            loading={loading}
          >
            Register
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
