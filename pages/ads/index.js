import React, { useState } from "react";
import Head from "next/head";
import Layout from "../../components/Layout";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import Link from "next/link";

export default function ads({ adsData }) {
  const [adData, setAdsDataState] = useState(adsData);

  const unVerifiedads = adData.filter((user) => user.adStatus === "unverified");

  console.log(unVerifiedads);
  return (
    <div className="flex flex-col min-w-full min-h-screen bg-gray-100">
      <Head>
        <title>All Ads</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="flex flex-col px-2">
          {/* new & unverified ads */}
          <SearchBar />

          <div className="card">
            <h2 className="h4 my-2">
              New and Unverified ads
              <span className="text-base text-gray-500 mx-2">
                ( total {unVerifiedads.length})
              </span>
            </h2>
            <div className="table md:w-full py-4 px-2 border-collapse border-2 border-gray-300 text-gray-700">
              <div className="table-row-group">
                <div className="table-row border-2 border-gray-300 text-black font-medium">
                  <div className="table-cell text-center p-2 font-medium">
                    Sr no
                  </div>
                  <div className="hidden md:table-cell text-center p-2 font-medium">
                    ID
                  </div>
                  <div className="table-cell text-center p-2 font-medium">
                    Ad Title
                  </div>
                  <div className="hidden md:table-cell text-center p-2 font-medium">
                    Posted By
                  </div>
                  <div className="hidden md:table-cell text-center p-2 font-medium">
                    Status
                  </div>
                  <div className="table-cell text-center p-2 font-medium">
                    Action
                  </div>
                </div>
                {unVerifiedads.map((ad, i) => (
                  <div className="table-row hover:bg-gray-200 smooth-trans ">
                    <div className="table-cell text-center p-2">{i + 1}</div>
                    <div className="hidden md:table-cell text-center p-2 font-medium text-blue-900">
                      {ad._id}
                    </div>
                    <div className="table-cell text-center p-2">{ad.title}</div>
                    <div className="hidden md:table-cell text-center p-2">
                      {ad.userName}
                    </div>
                    <div className="hidden md:table-cell text-center p-2 font-medium text-red-900 ">
                      {ad.adStatus}
                    </div>
                    <div className="table-cell text-center p-2">
                      <Button classes="md:w-3/4 mx-auto text-blue-900 cursor-pointer border-2 hover:bg-blue-900 border-blue-900 hover:text-white smooth-trans">
                        <Link href={`/ads/${ad._id}/`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* all users */}
          <br />

          <div className="card">
            <h2 className="h4 my-2">
              List Of All Ads
              <span className="text-base text-gray-500 mx-2">
                ( total {adData.length} )
              </span>
            </h2>
            <div className="table md:w-full py-4 px-2 border-collapse border-2 border-gray-300 text-gray-700">
              <div className="table-row-group">
                <div className="table-row border-2 border-gray-300 text-black font-medium">
                  <div className="table-cell text-center p-2 font-medium">
                    Sr no
                  </div>
                  <div className="hidden md:table-cell text-center p-2 font-medium">
                    ID
                  </div>
                  <div className="table-cell text-center p-2 font-medium">
                    Ad Title
                  </div>
                  <div className="hidden md:table-cell text-center p-2 font-medium">
                    Posted By
                  </div>
                  <div className="hidden md:table-cell text-center p-2 font-medium">
                    Status
                  </div>
                  <div className="table-cell text-center p-2 font-medium">
                    Action
                  </div>
                </div>
                {adData.map((ad, i) => (
                  <div className="table-row hover:bg-gray-200 smooth-trans ">
                    <div className="table-cell text-center p-2">{i + 1}</div>
                    <div className="hidden md:table-cell text-center p-2 font-medium text-blue-900">
                      {ad._id}
                    </div>
                    <div className="table-cell text-center p-2">{ad.title}</div>
                    <div className="hidden md:table-cell text-center p-2">
                      {ad.userName}
                    </div>
                    <div className="hidden md:table-cell text-center p-2 font-medium text-blue-900 ">
                      {ad.adStatus}
                    </div>
                    <div className="table-cell text-center p-2">
                      <Button classes="md:w-3/4 mx-auto text-blue-900 cursor-pointer border-2 hover:bg-blue-900 border-blue-900 hover:text-white smooth-trans">
                        <Link href={`/ads/${ad._id}/`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  // fetching
  const res = await fetch("https://bechdal-api.herokuapp.com/api/v1/ads");
  const adsData = await res.json();

  return {
    props: {
      adsData: adsData,
    },
  };
}
