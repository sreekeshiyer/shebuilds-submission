import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  const posts = [
    {
      id: 1,
      title: "Hello World",
      content: "Welcome to my blog!",
      author: "John Doe",
      date: "January 1, 2021",
    },
    {
      id: 2,
      title: "My First Post",
      content: "This is my first post on my new blog. I hope you enjoy it!",
      author: "John Doe",
      date: "January 2, 2021",
    },
    {
      id: 3,
      title: "Top 10 Things to Do in San Francisco",
      content:
        "San Francisco is a vibrant and exciting city with many things to see and do. Here is my list of the top 10 things to do in San Francisco: 1. Visit the Golden Gate Bridge...",
      author: "Jane Smith",
      date: "January 3, 2021",
    },
  ];

  return (
    <Layout title="Women in Tech | Forum">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-100">All Posts</h1>
        {posts.map((post) => (
          <Link href={"/posts/" + post.id} key={post.id}>
            <div className="bg-gray-700 rounded-lg shadow-lg p-6 mb-4">
              <h2 className="text-2xl font-bold mb-2 text-gray-100">
                {post.title}
              </h2>
              <p className="text-gray-400 mb-2">{post.content}</p>
              <div className="flex items-center justify-between">
                <div className="text-gray-400 text-sm">
                  {post.author} - {post.date}
                </div>
                <div>
                  <button className="bg-gray-500 text-gray-100 rounded-lg px-4 py-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white rounded-lg px-4 py-2 ml-2">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
