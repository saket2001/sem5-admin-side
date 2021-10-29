import { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import Link from "next/link";
import SearchBar from "../../components/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { searchActions } from "../../Store/Search";
import Loader from "../../components/Loader";
import SignIn from "../../components/Signin";
import useSession from "../../hooks/useSession";
import useDecrypt from "../../hooks/useDecrypt";

export default function Contact({ ContactForms }) {
  useSession();
  // get data from redux
  const dispatch = useDispatch(searchActions);
  const isLoggedIn = useSelector((state) => state.auth.status);
  const token = useSelector((state) => state?.auth?.token);
  const searchData = useSelector((state) => state.search.searchedData);

  const [loader, setLoaderState] = useState(null);
  const [contactForms, setContactForms] = useState(ContactForms);
  const [searchedData, setSearchedDataState] = useState(searchData);

  useEffect(() => {
    const fetchData = async () => {
      // fetching
      setLoaderState(true);
      const res = await fetch(
        "https://bechdal-api.herokuapp.com/api/v1/get-contact-forms",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      console.log(data);
      if (data.type) {
        setLoaderState(false);
        setContactForms(data?.data);
      }
    };

    fetchData();
  }, [token]);

  const unreadForms = contactForms?.filter((form) => form.status === "unread");

  const readForms = contactForms?.filter((form) => form.status === "read");

  const refreshPage = async () => {
    // turn on loader
    setLoaderState(true);
    // fetching
    const res = await fetch("https://bechdal-api.herokuapp.com/api/v1/users");
    const forms = await res.json();

    if (forms) setContactForms(forms);
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
    const searchResult = contactForms?.find(
      (data) => useDecrypt(data.fullName.toLowerCase()) === query
    );

    if (searchResult) {
      // adding to redux
      dispatch(searchActions.setSearchData(searchResult));
      setSearchedDataState(searchResult);
      // turn off loader
      setLoaderState(false);
    }
  };

  return (
    <>
      {!isLoggedIn && <SignIn />}

      {isLoggedIn && (
        <div className="flex flex-col min-w-full min-h-screen overflow-hidden bg-gray-100">
          <Head>
            <title>All Contact Forms</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Layout>
            <main className="flex flex-col px-2">
              {/* new & unverified users */}
              <div className="w-full flex flex-col md:flex-row md:items-center md:justify-center py-1 my-1">
                <SearchBar sendInput={searchQuery} />
                <Button
                  onClick={refreshPage}
                  classes="md:w-auto w-full bg-blue-900 text-white border-0 md:py-2 smooth-trans hover:transform hover:scale-95"
                >
                  Refresh
                </Button>
              </div>
              {loader && (
                <div className="w-full h-screen flex justify-center mt-4 text-2xl text-gray-700 font-medium">
                  <Loader />
                </div>
              )}
              {searchedData && !loader && (
                <div className="card">
                  <h2 className="h4 my-2">
                    Searched Contact Form
                    <span className="text-base text-gray-500 mx-2">
                      ( total {unreadForms.length} )
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
                        <div className="table-cell text-center p-2 font-medium">
                          Action
                        </div>
                      </div>

                      {[searchedData].map((form, i) => (
                        <div
                          className="table-row hover:bg-gray-200 smooth-trans"
                          key={form._id}
                        >
                          <div className="table-cell text-center p-2">
                            {i + 1}
                          </div>
                          <div className="hidden md:table-cell text-center p-2 font-medium text-blue-900">
                            {form._id}
                          </div>
                          <div className="table-cell text-center p-2">
                            {useDecrypt(form.fullName)}
                          </div>
                          <div className="table-cell text-center p-2">
                            <Button classes="md:w-3/4 mx-auto text-blue-900 cursor-pointer border-2 hover:bg-blue-900 border-blue-900 hover:text-white smooth-trans">
                              <Link href={`/contact/${form._id}`}>View</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {unreadForms?.length === 0 && readForms?.length === 0 && (
                <div className="px-4 py-5 my-2 bg-white rounded-lg shadow-sm">
                  <h1 className="text-3xl md:text-4xl mb-1 text-gray-900 font-semibold">
                    No Contact Forms found
                  </h1>
                  <p className="text-base md:text-lg text-gray-400">
                    New Contact form data will come here as user send contact
                    forms
                  </p>
                </div>
              )}
              {!searchedData && unreadForms?.length > 0 && (
                <div className="card">
                  <h2 className="h4 my-2">
                    Unread Contact Forms
                    <span className="text-base text-gray-500 mx-2">
                      ( total {unreadForms?.length} )
                    </span>
                  </h2>
                  {/* table */}
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
                        <div className="table-cell text-center p-2 font-medium">
                          Action
                        </div>
                      </div>

                      {/* table row */}
                      {unreadForms.map((form, i) => (
                        <div
                          className="table-row hover:bg-gray-200 smooth-trans "
                          key={form._id}
                        >
                          <div className="table-cell text-center p-2">
                            {i + 1}
                          </div>
                          <div className="hidden md:table-cell text-center p-2 font-medium text-blue-900">
                            {form._id}
                          </div>
                          <div className="table-cell text-center p-2">
                            {useDecrypt(form.fullName)}
                          </div>
                          <div className="table-cell text-center p-2">
                            <Button classes="md:w-3/4 mx-auto text-blue-900 cursor-pointer border-2 hover:bg-blue-900 border-blue-900 hover:text-white smooth-trans">
                              <Link href={`/contact/${form._id}`}>View</Link>
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
              {!searchedData && readForms?.length > 0 && (
                <div className="card">
                  <h2 className="h4 my-2">
                    Read Contact Forms
                    <span className="text-base text-gray-500 mx-2">
                      ( total {readForms?.length} )
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
                        <div className="table-cell text-center p-2 font-medium">
                          Action
                        </div>
                      </div>
                      {readForms.map((form, i) => (
                        <div
                          className="table-row hover:bg-gray-200 smooth-trans "
                          key={form._id}
                        >
                          <div className="table-cell text-center p-2">
                            {i + 1}
                          </div>
                          <div className="hidden md:table-cell text-center p-2 font-medium text-blue-900">
                            {form._id}
                          </div>
                          <div className="table-cell text-center p-2">
                            {useDecrypt(form.fullName)}
                          </div>
                          <div className="table-cell text-center p-2">
                            <Button classes="md:w-3/4 mx-auto text-blue-900 cursor-pointer border-2 hover:bg-blue-900 border-blue-900 hover:text-white smooth-trans">
                              <Link href={`/contact/${form._id}/`}>View</Link>
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
