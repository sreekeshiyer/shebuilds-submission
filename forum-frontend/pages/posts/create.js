import Layout from "@/components/DashboardLayout";
import React from "react";
import { useState } from "react";
import Loader from "@/components/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";

export default function CreatePost({ user, token }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title === "" || content === "") {
            toast.error("Title or Content cannot be empty.");
        }
        setLoading(true);

        const res = await fetch(`${API_URL}/api/posts`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    title: title,
                    content: content,
                    date: new Date().toISOString(),
                    author: user.full_name,
                    author_avatar: user.avatar,
                },
            }),
        });

        setLoading(false);
        router.push("/auth/dashboard");
    };

    return (
        <Layout title="Create Post">
            {loading && <Loader />}
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-4 text-gray-100">
                Create Post
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block text-gray-100 text-sm font-bold mb-2"
                    >
                        Title:
                    </label>
                    <input
                        name="title"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="content"
                        className="block text-gray-100 text-sm font-bold mb-2"
                    >
                        Content:
                    </label>
                    <textarea
                        name="content"
                        rows="5"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </Layout>
    );
}

export async function getServerSideProps({ req }) {
    if (!req.headers.cookie) {
        return {
            redirect: {
                permanent: false,
                destination: "/auth/register",
            },
            props: {},
        };
    }

    const { token } = parseCookies(req);

    const strapiRes = await fetch(`${API_URL}/api/users/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const user = await strapiRes.json();

    if (!user) {
        return {
            redirect: {
                permanent: false,
                destination: "/auth/register",
            },
            props: {},
        };
    }

    return {
        props: {
            user: user,
            token: token,
        },
    };
}
