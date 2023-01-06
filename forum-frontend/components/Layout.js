import Head from "next/head";
import Header from "./Header";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="A forum for Women in Tech" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="bg-gray-900 min-h-[95vh]">
        <div className="mx-auto max-w-4xl px-4 py-6">{children}</div>
      </main>
    </>
  );
}
