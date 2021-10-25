import Head from "next/head";
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import FakeInput from "../../../components/FakeInput";
import Table from "../../../components/Table";
import { useRouter } from "next/router";
import Loader from "../../../components/Loader";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useDecrypt from "../../../hooks/useDecrypt";
import Modal from "../../../components/Modal";
import SignIn from "../../../components/Signin";
import useSession from "../../../hooks/useSession";

export default function userPage() {
  useSession();
  const isLoggedIn = useSelector((state) => state.auth.status);
  const token = useSelector((state) => state.auth.token);

  const [modal, setModal] = useState("");
  const [loader, setLoader] = useState(true);
  const [modalState, setModalState] = useState(false);
  const [userData, setData] = useState(null);

  const router = useRouter();
  const userId = router.query.userId;

  // start loader and fetch user detail
  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      const res = await fetch(
        `https://bechdal-api.herokuapp.com/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);

      setData(data);

      // turn off loader
      setLoader(false);
    };

    getData();
  }, [userId]);

  const closeModal = () => {
    setModalState(false);
  };

  const confirmDelete = async () => {
    // delete user
    const res = await fetch(
      `https://bechdal-api.herokuapp.com/api/v1/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let title = "",
      message = "";

    // check if success
    if (res.json()) {
      title = "Success!!";
      message = "User deleted by admin successfully";
    } else {
      title = "Error !!";
      message = "User was not deleted successfully.Try again";
    }

    // send message
    setModal(
      <Modal
        title={title}
        message={message}
        closeModal={closeModal}
        closeOnOk={closeModal}
      />
    );
    router.push("/users");
  };

  const deleteUser = () => {
    setModal(
      <Modal
        title="Confirm To delete?"
        message="Are you sure you want to delete the following user?"
        closeModal={closeModal}
        closeOnOk={confirmDelete}
      />
    );
    setModalState(true);
  };

  const askUpdateUser = (value) => {
    setModal(
      <Modal
        title="Update User Status"
        message={`Are you sure you want to ${
          value === "verified" ? "verify" : "unverify"
        } the following user?`}
        closeModal={closeModal}
        closeOnOk={() => {
          updateUserStatus(value);
        }}
      />
    );
    setModalState(true);
  };

  const updateUserStatus = async (value) => {
    // update user
    const res = await fetch(
      `https://bechdal-api.herokuapp.com/api/v1/users/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: value }),
      }
    );

    let title = "",
      message = "";

    // check if success
    if (res.json()) {
      title = "Success!!";
      message = "User status updated by admin successfully";
    } else {
      title = "Error !!";
      message = "User status update failed.Try again";
    }

    // send message
    setModalState(true);
    setModal(
      <Modal
        title={title}
        message={message}
        closeModal={closeModal}
        closeOnOk={closeModal}
      />
    );
    router.push("/users");
  };

  return (
    <>
      {!isLoggedIn && <SignIn />}
      {isLoggedIn && (
        <div className="flex flex-col min-w-full min-h-screen bg-gray-100 z-0">
          <Head>
            <title>User Page</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Layout>
            {modalState && modal}
            {loader && (
              <div className="w-full h-screen flex justify-center items-center text-2xl text-gray-700 font-medium">
                <Loader />
              </div>
            )}
            {/* for showing error */}
            {!loader && !userData && (
              <div className="w-full h-full py-5 my-5 px-4 flex flex-col justify-center items-center">
                <h2 className="text-xl md:text-4xl font-medium pb-1">
                  Oops!! No Data Found
                </h2>
                <p className="text-lg md:text-2xl text-gray-500">
                  Please try with correct user ID or correct link
                </p>
              </div>
            )}
            {userData && !modalState && (
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
                    <h2 className="text-2xl md:text-4xl font-bold">
                      {userData.fullName}
                    </h2>
                    <div className=" w-full flex flex-row bg-blue-900 px-3 py-1 my-1 rounded-lg capitalize">
                      {userData.userStatus === "verified" && (
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
                      )}
                      {userData.userStatus === "unverified" && (
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}

                      <p className="text-white text-md">
                        {userData.userStatus}
                      </p>
                    </div>
                  </div>
                </div>
                {/* lower div */}
                <div className="flex flex-col p-5 my-5 bg-white rounded shadow-md">
                  <h2 className="text-2xl md:text-3xl font-semibold my-1">
                    Profile Info
                  </h2>
                  <FakeInput label="User Id" text={userData._id} />
                  <FakeInput label="Name" text={userData.fullName} />
                  <FakeInput label="Username" text={userData.username} />
                  <FakeInput label="Email" text={useDecrypt(userData.email)} />
                  <FakeInput
                    label="Contact No"
                    text={useDecrypt(userData.contact)}
                  />
                  <FakeInput
                    label="Address"
                    text={useDecrypt(userData.address)}
                  />
                  <FakeInput label="State" text={useDecrypt(userData.state)} />
                  <FakeInput label="City" text={useDecrypt(userData.city)} />
                  <FakeInput
                    label="Pin code"
                    text={useDecrypt(userData.pinCode)}
                  />
                  {/* button grp */}
                  <div className="flex flex-col md:flex-row my-1 px-2">
                    {userData.userStatus === "unverified" ? (
                      <Button
                        onClick={() => {
                          askUpdateUser("verified");
                        }}
                        classes="flex flex-row items-center justify-center border-0 bg-blue-900 text-white transform hover:scale-95 smooth-trans md:my-0 my-2"
                      >
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
                    ) : (
                      <Button
                        onClick={() => {
                          askUpdateUser("unverified");
                        }}
                        classes="flex flex-row items-center justify-center border-0 bg-red-900 text-white transform hover:scale-95 smooth-trans md:my-0 my-2"
                      >
                        Unverify User
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </Button>
                    )}
                    <Button classes="flex flex-row items-center justify-center border-2 border-blue-900 text-blue-900 transform hover:scale-95 smooth-trans md:my-0 my-2">
                      <a href={`mailto:${userData.email}`}>Contact Via Email</a>
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
                    <Button
                      onClick={deleteUser}
                      classes="flex flex-row items-center justify-center border-2 border-red-900 text-red-900 transform hover:scale-95 smooth-trans md:my-0 my-2"
                    >
                      Delete User
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
                {/* extra div */}
                {/* <div className="flex flex-col p-5 my-5 bg-white rounded shadow-md">
                <Table
                  heading={"Ads Posted By " + userData.name}
                  data={tableData1}
                />
              </div> */}
                {/* extra div */}
                {/* <div className="flex flex-col p-5 my-5 bg-white rounded shadow-md">
                <Table
                  heading={"Posted Bought By " + userData.name}
                  data={tableData2}
                />
              </div> */}
              </main>
            )}
          </Layout>
        </div>
      )}
    </>
  );
}
