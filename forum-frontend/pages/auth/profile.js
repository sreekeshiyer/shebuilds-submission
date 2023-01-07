import React, { useEffect } from "react";
import { useState, useContext } from "react";
import Layout from "@/components/DashboardLayout";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import AuthContext from "@/context/AuthContext";

export default function Profile({ token }) {
    const { user } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("null");
    const [full_name, setFullName] = useState("null");

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setUsername(user.username);
            setFullName(user.full_name);
        }
    }, [user]);

    const handleFileChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();

        formData.append("files", avatar);

        const res = await fetch(`${API_URL}/api/users`, {
            method: "PUT",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(await res.json());

        if (res.ok) {
            setAvatar(
                "https://res.cloudinary.com/zenon-cloudinary/image/upload/v1673083923/avatar_22dbc029f1.png"
            );
        }
    };

    return (
        <Layout title="My Profile">
            <div className="max-w-xs mx-auto mt-4">
                <form>
                    <div className="mb-4">
                        <label
                            htmlFor="full-name"
                            className="block text-gray-100 font-bold mb-2"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="full-name"
                            value={full_name}
                            className="bg-white form-input py-2 px-4 block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            readOnly={true}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-gray-100 font-bold mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            className="bg-white form-input py-2 px-4 block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            readOnly={true}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-100 font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            className="bg-white form-input py-2 px-4 block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            readOnly={true}
                        />
                    </div>
                    <div className="my-8 relative">
                        <label
                            htmlFor="email"
                            className="block text-gray-100 font-bold mb-2"
                        >
                            Upload or Change your Avatar
                        </label>
                        <img
                            src={
                                user?.avatar ||
                                "https://res.cloudinary.com/zenon-cloudinary/image/upload/v1673083923/avatar_22dbc029f1.png"
                            }
                            alt="Avatar preview"
                            className="h-32 w-32 rounded-md object-cover"
                        />

                        <input
                            type="file"
                            accept="image/*"
                            className="absolute bottom-0 left-0 right-0 top-0 rounded-md appearance-none opacity-0 cursor-pointer"
                            onChange={handleFileChange}
                        />
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ req }) {
    const user = parseCookies(req);
    return {
        props: {
            token: user,
        },
    };
}
