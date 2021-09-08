import Head from "next/head";
import InfoCard from "../components/InfoCard";
import Layout from "../components/Layout";
import Table from "../components/Table";

export default function Home({ userData, adsData }) {
  const unVerifiedUsers = userData.filter(
    (user) => user.userStatus === "unverified"
  );
  const unVerifiedads = adsData.filter((ad) => ad.adStatus === "unverified");
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
          <InfoCard
            userData={userData}
            unVerifiedUsers={unVerifiedUsers}
            adData={adsData}
            unVerifiedads={unVerifiedads}
          />
          <div className="w-full grid grid-cols-1 mt-4 gap-4 md:grid-cols-2">
            <Table heading="New Users" data={unVerifiedUsers} />
            <Table heading="New Ads" data={unVerifiedads} />
          </div>
        </main>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  // fetching
  const res1 = await fetch("https://bechdal-api.herokuapp.com/api/v1/users");
  const userData = await res1.json();

  const res2 = await fetch("https://bechdal-api.herokuapp.com/api/v1/ads");
  const adsData = await res2.json();

  return {
    props: {
      userData: userData,
      adsData: adsData,
    },
    revalidate: 2,
  };
}
