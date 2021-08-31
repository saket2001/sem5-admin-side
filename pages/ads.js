import Head from "next/head";
import Layout from "../components/Layout";
import Sort from "../components/Sort";
import Button from "../components/Button";
import Link from "next/link";

export default function ads() {
  return (
    <div className="flex flex-col min-w-full min-h-screen bg-gray-100">
      <Head>
        <title>All Ads</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="flex flex-col px-2">
          {/* new & unverified ads */}
          <Sort />

          <div className="card">
            <h2 className="h4 my-2">
              New and Unverified ads
              <span className="text-base text-gray-500 mx-2">( total 1)</span>
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

                <div className="table-row hover:bg-gray-200 smooth-trans ">
                  <div className="table-cell text-center p-2">1</div>
                  <div className="hidden md:table-cell text-center p-2 font-medium text-blue-900">
                    C21023121231
                  </div>
                  <div className="table-cell text-center p-2">A Book Set</div>
                  <div className="hidden md:table-cell text-center p-2">
                    Mary shine
                  </div>
                  <div className="hidden md:table-cell text-center p-2 font-medium text-red-900 ">
                    Unverified
                  </div>
                  <div className="table-cell text-center p-2">
                    <Button classes="md:w-3/4 mx-auto text-blue-900 cursor-pointer border-2 hover:bg-blue-900 border-blue-900 hover:text-white smooth-trans">
                      <Link href="/ads/1213?logged=true">View</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* all users */}
          <Sort />

          <div className="card">
            <h2 className="h4 my-2">
              List Of All Ads
              <span className="text-base text-gray-500 mx-2">( total 1 )</span>
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

                <div className="table-row hover:bg-gray-200 smooth-trans ">
                  <div className="table-cell text-center p-2">1</div>
                  <div className="hidden md:table-cell text-center p-2 font-medium text-blue-900">
                    C2102312123
                  </div>
                  <div className="table-cell text-center p-2">A Chair</div>
                  <div className="hidden md:table-cell text-center p-2">
                    Mary shine
                  </div>
                  <div className="hidden md:table-cell text-center p-2 font-medium text-blue-900 ">
                    Verified
                  </div>
                  <div className="table-cell text-center p-2">
                    <Button classes="md:w-3/4 mx-auto text-blue-900 cursor-pointer border-2 hover:bg-blue-900 border-blue-900 hover:text-white smooth-trans">
                      <Link href="/users/1213?logged=true">View</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}
