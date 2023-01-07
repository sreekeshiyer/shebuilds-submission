import Layout from "@/components/DashboardLayout";
import { useState } from "react";
import Link from "next/link";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import Loader from "@/components/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardPage({ posts, token }) {
    const [loading, setLoading] = useState(false);

    const deletePost = async (id) => {
        setLoading(true);

        const res = await fetch(`${API_URL}/api/posts/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setLoading(false);
    };

    return (
        <Layout>
            {loading && <Loader />}
            <ToastContainer />
            <div className="">
                <h1 className="text-3xl font-bold mb-4 text-gray-100">
                    My Posts
                </h1>
                <Link href="/posts/create">
                    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-40 my-4">
                        Share your Story
                    </div>
                </Link>
                {posts.length === 0 && (
                    <h1 className="font-bold text-xl mb-4 text-gray-100">
                        No Posts Found
                    </h1>
                )}
                {posts.map((post) => (
                    <div key={post.id}>
                        <div className="bg-gray-700 rounded-lg shadow-lg p-6 mb-4">
                            <Link href={"/posts/" + post.id}>
                                <h2 className="text-2xl font-bold mb-2 text-gray-100">
                                    {post.attributes.title}
                                </h2>
                                <p className="text-gray-400 mb-2">
                                    {post.attributes.content}
                                </p>
                            </Link>

                            <div className="flex items-center justify-between">
                                <div className="text-gray-400 text-sm">
                                    {new Date(
                                        post.attributes.date
                                    ).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </div>
                                <div>
                                    <Link href={"/posts/edit/" + post.id}>
                                        <button className="bg-gray-500 text-gray-100 rounded-lg px-4 py-2">
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        className="bg-red-500 text-white rounded-lg px-4 py-2 ml-2"
                                        onClick={() => deletePost(post.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
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

    const qs = require("qs");
    const query = qs.stringify(
        {
            sort: ["createdAt:desc"],
            filters: {
                author: {
                    $eq: user.full_name,
                },
            },
        },
        {
            encodeValuesOnly: true,
        }
    );

    const res = await fetch(`${API_URL}/api/posts?${query}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const posts = await res.json();

    return {
        props: { posts: posts.data, token: token },
    };
}
