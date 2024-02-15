"use client"

import { Separator } from "@/components/ui/separator";

async function getData(username: string, slug: string) {
    const post = await fetch(`http://localhost:8000/pages/get-page/${username}/${slug}`).then((res) => res.json());
    console.log(post)
    const author = await fetch(`http://localhost:8000/user/${post.user_id.$oid}`).then((res) => res.json());
    console.log(author)
    return { post, author };
}
export default async function Page({ params }: { params: { username: string, slug: string } }) {
    const { post, author } = await getData(params.username, params.slug);
    return (
        <div className="flex flex-col p-3 gap-7 md:justify-center md:items-center">
            <div className="">
                <p className="text-3xl font-bold">{post.title}</p>
                <p className="text-md text-neutral-400">By: {author.name}</p>
            </div>

            <div>
                <div className='
            p-4
                w-fit
                prose-h1:text-2xl prose-h1:font-bold
                prose-li:text-md prose-li:font-thin
                prose-a:text-neutral-400 prose-a:hover:underline prose-a:italic
            tracking-wider leading-7
            '>
                    <p dangerouslySetInnerHTML={{ __html: post.content }}>
                    </p>
                </div>
            </div>
        </div>
    )

}