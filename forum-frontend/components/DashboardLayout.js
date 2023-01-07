import Head from "next/head";
import Header from "./DashboardHeader";

export default function Layout({ title, keywords, description, children }) {
    return (
        <div>
            <div>
                <Head>
                    <title>{title}</title>
                    <meta name="keywords" content={keywords} />
                    <meta name="description" content={description} />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />

                <main className="bg-gray-900 min-h-[95vh]">
                    <div className="mx-auto max-w-4xl px-4 py-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

Layout.defaultProps = {
    title: "Women in Tech - Forum Dashboard",
    keywords: "women, empowerment, tech, STEM",
    description:
        "A forum to share stories about women in tech and their achievements.",
};
