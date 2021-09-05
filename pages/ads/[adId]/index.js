import Head from "next/head";
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import FakeInput from "../../../components/FakeInput";
import Image from "next/image";
import dummyAdImage from "../../../public/dummyAdImage.jpg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const tableData1 = [
  {
    id: 1,
    name: "A Book",
    buttonText: "View",
    buttonLink: "/ads",
  },
  {
    id: 2,
    name: "A Car",
    buttonText: "View",
    buttonLink: "/ads",
  },
];

const tableData2 = [
  {
    id: 1,
    name: "A Bike",
    buttonText: "View",
    buttonLink: "/ads",
  },
];

const userData = {
  id: 203,
  name: "A Book Set",
  description:
    "Used books containing all 8th Std textbooks. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sunt ducimus ratione amet ",
  price: "400",
  username: "@JohnD12",
  email: "Johndoe12@gmail.com",
  contact: "983012141",
  location: {
    address:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sunt ducimus ratione amet? Animi sunt corrupti temporibus alias repellendus culpa!",
    state: "Maharashtra",
    city: "Mumbai",
    code: "49932",
  },
  status: "Verified Ad",
};

export default function userAdPage() {
  // const router = useRouter();
  // const userId = +router.query.userId;

  const [loaderState, setLoaderState] = useState(false);
  // const [DataState, setDataState] = useState(false);

  // if (selectedUser) {
  //   setDataState(selectedUser);
  //   setLoaderState((prevState) => !prevState);
  // }

  return (
    <>
      {loaderState && (
        <div className="w-full h-screen flex justify-center items-center text-3xl text-gray-700 font-medium fade">
          Loading...
        </div>
      )}
      <div className="flex flex-col min-w-full min-h-screen bg-gray-100">
        <Head>
          <title>User Ad Page</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <main className="flex flex-col px-2 my-2 text-gray-700">
            {/* upper div */}
            <div className="flex flex-row p-5 items-center bg-white rounded shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              <div className="flex flex-col py-2">
                <h2 className="text-2xl md:text-4xl font-bold">
                  {userData.name}
                </h2>

                <div className="flex flex-row bg-blue-900 px-3 py-1 my-1 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-white text-md">{userData.status}</p>
                </div>
              </div>
            </div>
            {/* lower div */}
            <div className="flex flex-col p-5 my-5 bg-white rounded shadow-md">
              <h2 className="text-2xl md:text-3xl font-semibold my-1">
                Ad Info
              </h2>
              <FakeInput label="Ad Title" text={userData.name} />
              <FakeInput label="Ad Description" text={userData.description} />
              <FakeInput label="Ad Price" text={userData.price + "Rs"} />
              <FakeInput label="Ad Images" text="" />
              <div className="grid grid-cols-1 md:grid-cols-3 px-3 py-2">
                <div>
                  <Image
                    alt="product image"
                    src={dummyAdImage}
                    width="270px"
                    height="270px"
                  />
                </div>
                <div>
                  <Image
                    alt="product image"
                    src={dummyAdImage}
                    width="270px"
                    height="270px"
                  />
                </div>
                <div>
                  <Image
                    alt="product image"
                    src={dummyAdImage}
                    width="270px"
                    height="270px"
                  />
                </div>
                <div>
                  <Image
                    alt="product image"
                    src={dummyAdImage}
                    width="270px"
                    height="270px"
                  />
                </div>
              </div>

              <hr />

              <FakeInput label="Username" text={userData.username} />
              <FakeInput label="Email" text={userData.email} />
              <FakeInput label="Contact No" text={userData.contact} />
              <FakeInput label="Address" text={userData.location.address} />
              <FakeInput label="State" text={userData.location.state} />
              <FakeInput label="City" text={userData.location.city} />
              <FakeInput label="Pin code" text={userData.location.code} />
              {/* button grp */}
              <div className="flex flex-col md:flex-row my-1 px-2">
                <Button classes="flex flex-row items-center justify-center border-0 bg-blue-900 text-white transform hover:scale-95 smooth-trans md:my-0 my-2 ">
                  Verify Ad
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </Button>
                <Button classes="flex flex-row items-center justify-center border-blue-900 text-blue-900 transform hover:scale-95 smooth-trans md:my-0 my-2">
                  Contact via Email
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
                <Button classes="flex flex-row items-center justify-center border-red-900 text-red-900 transform hover:scale-95 smooth-trans md:my-0 my-2">
                  Delete Ad
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </main>
        </Layout>
      </div>
    </>
  );
}
