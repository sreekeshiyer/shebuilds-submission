import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function PostPage() {
  const router = useRouter();

  const id = router.query.id;

  const posts = [
    {
      id: 1,
      title: "Hello World",
      content: "Welcome to my blog!",
      author: {
        name: "John Smith",
        avatar: "https://i.pravatar.cc/150?u=john@smith.com",
      },
      date: "January 1, 2021",
    },
    {
      id: 2,
      title: "My First Post",
      content: "This is my first post on my new blog. I hope you enjoy it!",
      author: {
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?u=sarah@johnson.com",
      },
      date: "January 2, 2021",
    },
    {
      id: 3,
      title: "Top 10 Things to Do in San Francisco",
      content:
        "San Francisco is a vibrant and exciting city with many things to see and do. Here is my list of the top 10 things to do in San Francisco: 1. Visit the Golden Gate Bridge...",
      author: {
        name: "Michael Williams",
        avatar: "https://i.pravatar.cc/150?u=michael@williams.com",
      },
      date: "January 3, 2021",
    },
  ];

  const post = {
    id: 1,
    title: "Hello World",
    content: "Welcome to my blog!",
    author: {
      name: "John Smith",
      avatar: "https://i.pravatar.cc/150?u=john@smith.com",
    },
    date: "January 1, 2021",
  };

  const comments = [
    {
      id: 1,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "October 14, 2021",
      author: {
        name: "John Smith",
        avatar: "https://i.pravatar.cc/150?u=john@smith.com",
      },
    },
    {
      id: 2,
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      date: "October 15, 2021",
      author: {
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?u=sarah@johnson.com",
      },
    },
    {
      id: 3,
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      date: "October 16, 2021",
      author: {
        name: "Michael Williams",
        avatar: "https://i.pravatar.cc/150?u=michael@williams.com",
      },
    },
  ];

  return (
    <Layout title="Post Title">
      <div className="bg-gray-800 p-4 mt-4 rounded-lg shadow-xl">
        <div className="flex items-center mb-4">
          <img
            className="w-12 h-12 rounded-full mr-4"
            src={post.author.avatar}
            alt={post.author.name}
          />
          <div className="text-white">
            <h2 className="font-bold text-lg">{post.author.name}</h2>
            <p className="text-sm text-gray-600">{post.date}</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-100 mb-4">{post.title}</h2>
        <p className="text-gray-100 leading-loose mb-4">{post.content}</p>
        <hr className="border-gray-700 mb-4" />
        <div className="mb-4">
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <div className="flex items-center mb-2">
                <img
                  className="w-8 h-8 rounded-full mr-4"
                  src={comment.author.avatar}
                  alt={comment.author.name}
                />
                <div className="text-white">
                  <h3 className="font-bold text-lg">{comment.author.name}</h3>
                  <p className="text-sm text-gray-600">{comment.date}</p>
                </div>
              </div>
              <p className="text-gray-100 leading-loose">{comment.content}</p>
            </div>
          ))}
        </div>
        <Link href="/posts/[id]" as={`/posts/${post.id}`}>
          <div className="bg-gray-700 px-4 py-2 rounded-full text-white hover:bg-gray-800">
            Leave a comment
          </div>
        </Link>
      </div>
    </Layout>
  );
}
