import Head from "next/head";
import InfoCard from "../components/InfoCard";
import Layout from "../components/Layout";
import Table from "../components/Table";

export default function Home() {
  return (
    <div className="flex flex-col min-w-full min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout activeLink="dashboard">
        <main className="flex flex-col px-2">
          <div className="px-4 py-5 my-2 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl md:text-4xl mb-1 text-gray-900 font-semibold">
              Welcome Back Admin
            </h1>
            <p className="text-base md:text-lg text-gray-400">
              Here's what happening with your site today
            </p>
          </div>
          <InfoCard />
          <div className="w-full grid grid-cols-1 mt-4 gap-4 md:grid-cols-2">
            <Table heading="New Ads" />
            <Table heading="New Users" />
          </div>
        </main>
      </Layout>
    </div>
  );
}
