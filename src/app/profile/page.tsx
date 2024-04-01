"use client"
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
export default function Home() {
  const { push } = useRouter()
  const [user, setUser] = useState("")

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      redirect("/login")
    }
    if (localStorage.getItem("user")) {
      const username = localStorage.getItem("user");
      setUser(username ? username : "");
    }

  }, [])

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    push("/")
  }

  return (
    <main className="flex min-h-screen w-full h-full flex-col p-10 dark:bg-black gap-4 ">
      <Navbar username={user} />
      <div className="flex flex-row w-[50%] justify-end">
        <Button onClick={logout} variant={'destructive'}> Logout </Button>
      </div>
    </main>
  )
}
