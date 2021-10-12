import Head from "next/head";
import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import InfoCard from "../components/InfoCard";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import SignIn from "../components/Signin";
import Table from "../components/Table";
import useSession from "../hooks/useSession";

export default function Home({ userData, adsData }) {
  useSession();
  const isLoggedIn = useSelector((state) => state.auth.status);

  const [userDataState, setUserData] = useState(userData);
  const [adDataState, setAdData] = useState(adsData);
  const [loader, setLoaderState] = useState(null);

  const unVerifiedUsers = userDataState.filter(
    (user) => user.userStatus === "unverified"
  );
  const unVerifiedads = adDataState.filter(
    (ad) => ad.adStatus === "unverified"
  );

  return (
    <>
      {!isLoggedIn && <SignIn />}
      {isLoggedIn && (
        <div className="flex flex-col min-w-full min-h-screen bg-gray-100">
          <Head>
            <title>Dashboard</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Layout activeLink="dashboard">
            {loader && (
              <div className="w-full h-screen flex justify-center mt-4 text-2xl text-gray-700 font-medium">
                <Loader />
              </div>
            )}
            <main className="flex flex-col px-2">
              <div className="px-4 py-5 my-2 bg-white rounded-lg shadow-sm">
                <h1 className="text-3xl md:text-4xl mb-1 text-gray-900 font-semibold">
                  Welcome Back Admin
                </h1>
                <p className="text-base md:text-lg text-gray-400">
                  Here's what happening with your site today
                </p>
              </div>
              <InfoCard
                userData={userDataState}
                unVerifiedUsers={unVerifiedUsers}
                adData={adDataState}
                unVerifiedads={unVerifiedads}
              />
              <div className="w-full grid grid-cols-1 mt-4 gap-4 md:grid-cols-2">
                {unVerifiedUsers.length > 0 ? (
                  <Table heading="New Users" data={unVerifiedUsers} />
                ) : (
                  <div className="px-4 py-5 my-2 bg-white rounded-lg shadow-sm">
                    <h1 className="text-3xl md:text-4xl mb-1 text-gray-900 font-semibold">
                      No new users right now
                    </h1>
                    <p className="text-base md:text-lg text-gray-400">
                      Will show you new users as soon as users sign up
                    </p>
                  </div>
                )}
                {unVerifiedads.length > 0 ? (
                  <Table heading="New Ads" data={unVerifiedads} option={true} />
                ) : (
                  <div className="px-4 py-5 my-2 bg-white rounded-lg shadow-sm">
                    <h1 className="text-3xl md:text-4xl mb-1 text-gray-900 font-semibold">
                      No new ads right now
                    </h1>
                    <p className="text-base md:text-lg text-gray-400">
                      Will show you new ads as soon as users posts them
                    </p>
                  </div>
                )}
              </div>
            </main>
          </Layout>
        </div>
      )}
    </>
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
