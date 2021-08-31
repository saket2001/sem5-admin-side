import Head from "next/head";
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import FakeInput from "../../../components/FakeInput";
import Table from "../../../components/Table";
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
  id: 1213,
  name: "John doe",
  username: "@JohnD12",
  email: "Johndoe12@gmail.com",
  age: 30,
  contact: "983012141",
  location: {
    address:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sunt ducimus ratione amet? Animi sunt corrupti temporibus alias repellendus culpa!",
    state: "Maharashtra",
    city: "Mumbai",
    code: "49932",
  },
  status: "Verified User",
};

export default function userPage() {
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
          <title>User Page</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <main className="flex flex-col px-2 my-2 text-gray-700">
            {/* upper div */}
            <div className="flex flex-row p-5  items-center bg-white rounded shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 mx-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex flex-col py-2">
                <p className="text-lg text-gray-400">{userData.username}</p>
                <h2 className="text-2xl md:text-4xl font-bold">
                  {userData.name}
                </h2>
                <div className="w-auto flex flex-row bg-blue-900 px-3 py-1 my-1 rounded-lg">
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
                  <p className="text-white text-md">{userData.status} User</p>
                </div>
              </div>
            </div>
            {/* lower div */}
            <div className="flex flex-col p-5 my-5 bg-white rounded shadow-md">
              <h2 className="text-2xl md:text-3xl font-semibold my-1">
                Profile Info
              </h2>
              <FakeInput label="Name" text={userData.name} />
              <FakeInput label="Username" text={userData.username} />
              <FakeInput label="Email" text={userData.email} />
              <FakeInput label="Age" text={userData.age} />
              <FakeInput label="Contact No" text={userData.contact} />
              <FakeInput label="Address" text={userData.location.address} />
              <FakeInput label="State" text={userData.location.state} />
              <FakeInput label="City" text={userData.location.city} />
              <FakeInput label="Pin code" text={userData.location.code} />
              {/* button grp */}
              <div className="flex flex-col md:flex-row my-1 px-2">
                <Button classes="flex flex-row items-center justify-center border-0 bg-blue-900 text-white transform hover:scale-95 smooth-trans md:my-0 my-2 ">
                  Verify User
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
              </div>
            </div>
            {/* extra div */}
            <div className="flex flex-col p-5 my-5 bg-white rounded shadow-md">
              <Table
                heading={"Ads Posted By " + userData.name}
                data={tableData1}
              />
            </div>
            {/* extra div */}
            <div className="flex flex-col p-5 my-5 bg-white rounded shadow-md">
              <Table
                heading={"Posted Bought By " + userData.name}
                data={tableData2}
              />
            </div>
          </main>
        </Layout>
      </div>
    </>
  );
}
