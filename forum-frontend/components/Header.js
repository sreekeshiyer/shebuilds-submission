import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { user, logout } = useContext(AuthContext);
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

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
                <Link href="/posts/create">
                    <div className="text-gray-100 hover:text-gray-300 mr-4">
                        Share your story
                    </div>
                </Link>
                {!user ? (
                    <Link href="/auth/register">
                        <div className="text-gray-100 hover:text-gray-300 mr-4">
                            Register
                        </div>
                    </Link>
                ) : (
                    <div>
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={
                                            user?.avatar ||
                                            "https://res.cloudinary.com/zenon-cloudinary/image/upload/v1673083923/avatar_22dbc029f1.png"
                                        }
                                        alt=""
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                href="/auth/profile"
                                                className={classNames(
                                                    active ? "bg-gray-100" : "",
                                                    "block px-4 py-2 text-sm text-gray-700"
                                                )}
                                            >
                                                Your Profile
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={async () =>
                                                    await logout()
                                                }
                                                className={classNames(
                                                    active ? "bg-gray-100" : "",
                                                    "block px-4 py-2 text-sm text-gray-700"
                                                )}
                                            >
                                                Logout
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                )}
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
                <Link href="/posts/create">
                    <div className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-700 mt-4">
                        Share your story
                    </div>
                </Link>

                {!user ? (
                    <Link href="/auth/register">
                        <div className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-700 mt-4">
                            Register
                        </div>
                    </Link>
                ) : (
                    <div>
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={
                                            user?.avatar ||
                                            "https://res.cloudinary.com/zenon-cloudinary/image/upload/v1673083923/avatar_22dbc029f1.png"
                                        }
                                        alt=""
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                href="/auth/profile"
                                                className={classNames(
                                                    active ? "bg-gray-100" : "",
                                                    "block px-4 py-2 text-sm text-gray-700"
                                                )}
                                            >
                                                Your Profile
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={async () =>
                                                    await logout()
                                                }
                                                className={classNames(
                                                    active ? "bg-gray-100" : "",
                                                    "block px-4 py-2 text-sm text-gray-700"
                                                )}
                                            >
                                                Logout
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
