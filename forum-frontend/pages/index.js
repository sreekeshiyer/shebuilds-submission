import Layout from "@/components/Layout";
import Link from "next/link";
import { API_URL } from "../config";

export default function Home({ posts }) {
    return (
        <Layout title="Women in Tech | Forum">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-4">
                <h1 className="text-3xl font-bold mb-4 text-gray-100">
                    All Posts
                </h1>
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
                                    {}
                                    {post.attributes.author} -{" "}
                                    {new Date(
                                        post.attributes.date
                                    ).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </div>
                                {/* <div>
                                    <button className="bg-gray-500 text-gray-100 rounded-lg px-4 py-2">
                                        Edit
                                    </button>
                                    <button className="bg-red-500 text-white rounded-lg px-4 py-2 ml-2">
                                        Delete
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    const res = await fetch(`${API_URL}/api/posts`, {
        method: "GET",
    });
    const posts = await res.json();

    return {
        props: { posts: posts.data },
    };
}
