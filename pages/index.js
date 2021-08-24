import Head from "next/head";
import InfoCard from "../components/InfoCard";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <div className="flex flex-col min-w-full min-h-screen">
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout activeLink="dashboard">
        <main className="flex flex-col px-2">
          <InfoCard />
        </main>
      </Layout>
    </div>
  );
}
