import Head from "next/head";
import Layout from "../components/Layout";
import Sort from "../components/Sort";

export default function ads() {
  return (
    <div className="flex flex-col min-w-full min-h-screen bg-gray-100">
      <Head>
        <title>All Ads</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="flex flex-col px-2">
          <Sort />
        </main>
      </Layout>
    </div>
  );
}
