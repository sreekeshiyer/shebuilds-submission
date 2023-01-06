import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold text-gray-100">
          Women in Tech | Forum
        </h1>
      </Link>
      <nav className="hidden md:flex items-center">
        <Link href="/">
          <div className="text-gray-100 hover:text-gray-300 mr-4">
            All Posts
          </div>
        </Link>
        <Link href="/share">
          <div className="text-gray-100 hover:text-gray-300 mr-4">
            Share your story
          </div>
        </Link>
        <Link href="/signin">
          <div className="text-gray-100 hover:text-gray-300">
            Sign Up/Sign In
          </div>
        </Link>
      </nav>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden px-3 py-2 rounded-lg focus:outline-none ml-4 transform ease-in-out hover:scale-125 transition-all duration-300"
      >
        <svg
          className={`w-5 h-5 fill-current text-gray-100 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
          viewBox="0 0 24 24"
        >
          <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
        </svg>
      </button>
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } transition duration-300 ease-in-out`}
      >
        <Link href="/">
          <div className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-700">
            All Posts
          </div>
        </Link>
        <Link href="/share">
          <div className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-700 mt-4">
            Share your story
          </div>
        </Link>
        <Link href="/signin">
          <div className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-700 mt-4">
            Sign Up/Sign In
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
