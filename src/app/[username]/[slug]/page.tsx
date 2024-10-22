"use client";
import { redirect } from "next/navigation";

async function getData(username: string, slug: string) {
  //@ts-ignore
  let post = await fetch(
    `https://rusty-leaf-backend.shuttleapp.rs/pages/get-page/${username}/${slug}`
  );
  console.log(post);
  if (post.status !== 200) {
    redirect("/not-found");
  } else {
    post = await post.json();
  }

  //@ts-ignore
  const author_data = await fetch(
    `https://rusty-leaf-backend.shuttleapp.rs/user/${post.user_id.$oid}`
  );
  if (author_data.status !== 200) {
    redirect("/not-found");
  }
  const author = await author_data.json();
  console.log(author);
  return { post, author };
}
export default async function Page({
  params,
}: {
  params: { username: string; slug: string };
}) {
  const { post, author } = await getData(params.username, params.slug);
  return (
    <div className="flex flex-col p-3 md:justify-center md:items-center">
      <div className="">
        <p className="text-3xl font-bold text-[#ffc799]">
          {
            //@ts-ignore
            post.title
          }
        </p>
        <p className="text-md">By: {author.name}</p>
      </div>

      <div
        className="
                w-full
                md:w-[70%]
                lg:w-[55%]
                prose-h1:text-[#ffc799]
                p-4
                prose-h1:text-2xl prose-h1:font-bold
                prose-li:text-md prose-li:font-thin prose-li:list-disc
                prose-a:text-neutral-400 prose-a:hover:underline prose-a:italic
            tracking-wider leading-7
            "
      >
        <p dangerouslySetInnerHTML={{ __html: post.content }} className=""></p>
      </div>
      <span className="w-[90%] md:w-[60%] lg:w-[50%] h-[1px] bg-gray-400 mt-6 mb-3"></span>
      <div className="text-[#76eecd]">{author.name}</div>
    </div>
  );
}
