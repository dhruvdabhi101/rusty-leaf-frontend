"use client"
import Editor, { Monaco } from "@monaco-editor/react"
import { useEffect, useState } from "react"
import { Converter } from "darkdown-ts"
export default function Page() {
    const [textData, setTextData] = useState("");
    const converter = new Converter();
    return (
        <>
            <div className="flex flex-row h-full w-full gap-5">
            <Editor
                height={"90vh"}
                width={"50%"}
                theme="vs-dark"
                defaultLanguage="darkdown"
                onChange={(e) => setTextData(converter.convertToHtml(e ?? ""))}
                path="main.dd"
            />
                <div className="w-full">
                    Preview

                <div className='
            p-4
                w-fit
                prose-h1:text-2xl prose-h1:font-bold
                prose-li:text-md prose-li:font-thin
                prose-a:text-neutral-400 prose-a:hover:underline prose-a:italic
            tracking-wider leading-7
            '>
                    <p dangerouslySetInnerHTML={{ __html: textData }}>
                    </p>
                </div>
                </div>
            </div>
        </>
    )
}
