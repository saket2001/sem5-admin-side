import Head from "next/head";
import InfoCard from "../components/InfoCard";
import Layout from "../components/Layout";
import Table from "../components/Table";

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
          <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2">
            <Table heading="New Ads" />
            <Table heading="New Users" />
          </div>
        </main>
      </Layout>
    </div>
  );
}
