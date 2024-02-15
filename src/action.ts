"use server"

import axios from "axios";

export async function login(username: string, password:string) {
    try {
        const data = axios.post("http://127.0.0.1:8000/login", {
            "username": username,
            "password": password
        });
        console.log(data)
        return data;
    } catch (err) {
        console.error(err);
    }
}
