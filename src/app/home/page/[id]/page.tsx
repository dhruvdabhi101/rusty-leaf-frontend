"use client"
import Editor, { Monaco } from "@monaco-editor/react"
import { useEffect } from "react"
export default function Page() {
    return (
        <>
            <Editor
                height={"90vh"}
                width={"50%"}
                theme="vs-dark"
                defaultLanguage="darkdown"
                path="main.dd"
            />
        </>
    )
}
