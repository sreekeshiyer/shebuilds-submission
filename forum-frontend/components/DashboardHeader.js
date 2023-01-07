import Link from "next/link";
import Image from "next/image";
import { useContext, Fragment } from "react";
import AuthContext from "@/context/AuthContext";
import { Menu, Transition } from "@headlessui/react";

export default function Header() {
    const { user, logout } = useContext(AuthContext);

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    return (
        <header className="bg-gray-800 text-gray-100 shadow w-full">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link href="/">
                    <h1 className="text-2xl font-bold text-gray-100">
                        Women in Tech | Forum
                    </h1>
                </Link>
                <nav className="flex flex-wrap md:w-4/5 items-center justify-end text-base md:ml-auto">
                    <Link href={`/volunteers/${user?.username}`}>
                        <div className="mx-5 cursor-pointer uppercase hover:text-indigo-300">
                            {user?.username}
                        </div>
                    </Link>
                    <Menu as="div" className="relative ml-3">
                        <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">Open user menu</span>
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
                                            onClick={async () => await logout()}
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
                </nav>
            </div>
        </header>
    );
}
