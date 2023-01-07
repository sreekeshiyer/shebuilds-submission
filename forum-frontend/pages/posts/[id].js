import React from "react";
import { useState, useContext } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";
import { API_URL } from "@/config/index";

export default function PostPage({ post, comments }) {
    const router = useRouter();

    const { user } = useContext(AuthContext);

    const id = router.query.id;

    const [comment, setComment] = useState("");

    const handleNewComment = async (e) => {
        e.preventDefault();

        const res = await fetch(`${API_URL}/api/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                data: {
                    content: comment,
                    author_name: user.full_name,
                    author_avatar: user.avatar,
                    date: new Date().toISOString(),
                    post_id: id,
                    author_id: user.id.toString(),
                },
            }),
        });

        router.push(`/posts/${id}`);
    };

    return (
        <Layout title="Post Title">
            <div className="bg-gray-800 p-4 mt-4 rounded-lg shadow-xl">
                <div className="flex items-center mb-4">
                    <img
                        className="w-12 h-12 rounded-full mr-4"
                        src={post.attributes.author_avatar}
                        alt={post.attributes.author}
                    />
                    <div className="text-white">
                        <h2 className="font-bold text-lg">
                            {post.attributes.author}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {new Date(post.attributes.date).toLocaleDateString(
                                "en-US",
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }
                            )}
                        </p>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-100 mb-4">
                    {post.attributes.title}
                </h2>
                <p className="text-gray-100 leading-loose mb-4">
                    {post.attributes.content}
                </p>
                <hr className="border-gray-700 mb-4" />
                <h1 className="font-bold text-lg text-gray-100 my-4">
                    Comments
                </h1>
                <div className="mb-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="mb-4">
                            <div className="flex items-center mb-2">
                                <img
                                    className="w-8 h-8 rounded-full mr-4"
                                    src={comment.attributes.author_avatar}
                                    alt={comment.attributes.author_name}
                                />
                                <div className="text-white">
                                    <h3 className="font-bold text-lg">
                                        {comment.attributes.author_name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {new Date(
                                            comment.attributes.date
                                        ).toLocaleDateString("en-US", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-100 leading-loose">
                                {comment.attributes.content}
                            </p>
                        </div>
                    ))}
                </div>
                {user && (
                    <form
                        onSubmit={handleNewComment}
                        className="flex items-center justify-between px-4 py-3 shadow rounded-md bg-gray-100"
                    >
                        <textarea
                            className="form-input w-full px-3 py-2 leading-tight text-gray-700 rounded-md focus:outline-none focus:shadow-outline-blue-500"
                            placeholder="Leave a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                        >
                            Comment
                        </button>
                    </form>
                )}
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ query }) {
    const res = await fetch(`${API_URL}/api/posts/${query.id}`, {
        method: "GET",
    });
    const post = await res.json();

    const qs = require("qs");
    const q = qs.stringify(
        {
            sort: ["createdAt:desc"],
            filters: {
                post_id: {
                    $eq: post.data.id,
                },
            },
        },
        {
            encodeValuesOnly: true,
        }
    );

    const commentRes = await fetch(`${API_URL}/api/comments?${q}`, {
        method: "GET",
    });

    const comments = await commentRes.json();

    return {
        props: {
            post: post.data,
            comments: comments.data,
        },
    };
}
