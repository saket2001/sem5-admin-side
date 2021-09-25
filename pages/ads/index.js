import React, { useState } from "react";
import Head from "next/head";
import Layout from "../../components/Layout";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { searchActions } from "../../Store/Search";
import Loader from "../../components/Loader";
import SignIn from "../../components/Signin";

export default function ads({ adsData }) {
  const isLoggedIn = useSelector((state) => state.auth.status);

  // get data from redux
  const dispatch = useDispatch(searchActions);
  const searchData = useSelector((state) => state.search.searchedData);

  const [loader, setLoaderState] = useState(null);
  const [adData, setAdsDataState] = useState(adsData);
  const [searchedData, setSearchedDataState] = useState(searchData);

  const unVerifiedAds = adData.filter((user) => user.adStatus === "unverified");
  const verifiedAds = adData.filter((user) => user.adStatus === "verified");

  const refreshPage = async () => {
    // turn on loader
    setLoaderState(true);
    // fetching
    const res = await fetch("https://bechdal-api.herokuapp.com/api/v1/ads");
    const userData = await res.json();
    if (userData) setAdsDataState(userData);
    // turn off loader
    setLoaderState(false);
  };

  const searchQuery = (query) => {
    // turn on loader
    setLoaderState(true);

    if (query.length === 0) {
      dispatch(searchActions.clearSearchData());
      setLoaderState(false);
      return setSearchedDataState(null);
    }

    // look for query in usersData array
    const data = adData.find((data) => data.title === query);

    if (data) {
      // adding to redux
      dispatch(searchActions.setSearchData(data));
      setSearchedDataState(data);
      // turn off loader
      setLoaderState(false);
    }
  };

  return (
    <>
      {!isLoggedIn && <SignIn />}
      {isLoggedIn && (
        <div className="flex flex-col min-w-full min-h-screen bg-gray-100">
          <Head>
            <title>All Ads</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Layout>
            <main className="flex flex-col px-2">
              {/* new & unverified ads */}
              <div className="w-full flex flex-col md:flex-row md:items-center md:justify-center py-1 my-1">
                <SearchBar sendInput={searchQuery} />
                <Button
                  onClick={refreshPage}
                  classes="bg-blue-900 text-white border-0 md:py-2 smooth-trans hover:transform hover:scale-95"
                >
                  Refresh
                </Button>
              </div>

              {loader && (
                <div className="w-full h-screen flex justify-center items-center text-2xl text-gray-700 font-medium">
                  <Loader />
                </div>
              )}
              {searchedData && !loader && (
                <div className="card">
                  <h2 className="h4 my-2">
                    Searched User
                    <span className="text-base text-gray-500 mx-2">
                      ( total {unVerifiedads.length} )
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
                          Name
                        </div>
                        <div className="hidden md:table-cell text-center p-2 font-medium">
                          Email
                        </div>
                        <div className="hidden md:table-cell text-center p-2 font-medium">
                          Status
                        </div>
                        <div className="table-cell text-center p-2 font-medium">
                          Action
                        </div>
                      </div>

                      {[searchedData].map((ad, i) => (
                        <div className="table-row hover:bg-gray-200 smooth-trans ">
                          <div className="table-cell text-center p-2">
                            {i + 1}
                          </div>
                          <div className="hidden md:table-cell text-center p-2 font-medium text-blue-900">
                            {ad._id}
                          </div>
                          <div className="table-cell text-center p-2">
                            {ad.title}
                          </div>
                          <div className="hidden md:table-cell text-center p-2">
                            {ad.username}
                          </div>
                          <div className="hidden md:table-cell text-center p-2 font-medium text-red-900 ">
                            {ad.adStatus}
                          </div>
                          <div className="table-cell text-center p-2">
                            <Button classes="md:w-3/4 mx-auto text-blue-900 cursor-pointer border-2 hover:bg-blue-900 border-blue-900 hover:text-white smooth-trans">
                              <Link href={`/ads/${ad._id}`}>View</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {!searchedData && unVerifiedAds.length > 0 && (
                <div className="card">
                  <h2 className="h4 my-2">
                    New and Unverified ads
                    <span className="text-base text-gray-500 mx-2">
                      ( total {unVerifiedAds.length})
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
                          Status
                        </div>
                        <div className="table-cell text-center p-2 font-medium">
                          Action
                        </div>
                      </div>
                      {unVerifiedAds.map((ad, i) => (
                        <div className="table-row hover:bg-gray-200 smooth-trans ">
                          <div className="table-cell text-center p-2">
                            {i + 1}
                          </div>
                          <div className="hidden md:table-cell text-center p-2 font-medium text-blue-900">
                            {ad._id}
                          </div>
                          <div className="table-cell text-center p-2">
                            {ad.title}
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
              )}

              {/* all users */}
              <br />
              {!searchedData && verifiedAds.length > 0 && (
                <div className="card">
                  <h2 className="h4 my-2">
                    List Of All Verified Ads
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
                          Status
                        </div>
                        <div className="table-cell text-center p-2 font-medium">
                          Action
                        </div>
                      </div>
                      {verifiedAds.map((ad, i) => (
                        <div className="table-row hover:bg-gray-200 smooth-trans ">
                          <div className="table-cell text-center p-2">
                            {i + 1}
                          </div>
                          <div className="hidden md:table-cell text-center p-2 font-medium text-blue-900">
                            {ad._id}
                          </div>
                          <div className="table-cell text-center p-2">
                            {ad.title}
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
              )}
            </main>
          </Layout>
        </div>
      )}
    </>
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
    revalidate: 2,
  };
}
