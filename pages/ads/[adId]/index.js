import Head from "next/head";
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import FakeInput from "../../../components/FakeInput";
import Image from "next/image";
import dummyAdImage from "../../../public/dummyAdImage.jpg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import Modal from "../../../components/Modal";

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

export default function userAdPage() {
  const [modal, setModal] = useState("");
  const [modalState, setModalState] = useState(false);
  const [loader, setLoader] = useState(true);
  const [DataState, setDataState] = useState(null);

  const router = useRouter();
  const adId = router.query.adId;

  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      const res = await fetch(
        `https://bechdal-api.herokuapp.com/api/v1/ads/${adId}`
      );

      const data = await res.json();
      console.log(data);

      setDataState(data);

      // turn off loader
      setLoader(false);
    };

    getData();
  }, [adId]);

  const closeModal = () => {
    setModalState(false);
  };

  const confirmDelete = async () => {
    // delete user
    const res = await fetch(
      `https://bechdal-api.herokuapp.com/api/v1/ads/${adId}`,
      {
        method: "DELETE",
      }
    );

    let title = "",
      message = "";

    // check if success
    if (res.json()) {
      title = "Success!!";
      message = "User Ad deleted by admin successfully";
    } else {
      title = "Error !!";
      message = "User Ad was not deleted successfully.Try again";
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
    router.push("/ads");
  };

  const deleteAd = () => {
    setModal(
      <Modal
        title="Confirm To delete?"
        message="Are you sure you want to delete the following ad?"
        closeModal={closeModal}
        closeOnOk={confirmDelete}
      />
    );
    setModalState(true);
  };

  const askUpdateAd = (value) => {
    setModal(
      <Modal
        title="Update Ad Status"
        message={`Are you sure you want to ${
          value === "verified" ? "verify" : "unverify"
        } the following Ad?`}
        closeModal={closeModal}
        closeOnOk={() => {
          updateAdStatus(value);
        }}
      />
    );
    setModalState(true);
  };

  const updateAdStatus = async (value) => {
    // update user
    const res = await fetch(
      `https://bechdal-api.herokuapp.com/api/v1/ads/${adId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ status: value }),
      }
    );

    let title = "",
      message = "";

    // check if success
    if (res.json()) {
      title = "Success!!";
      message = "Ad status updated by admin successfully";
    } else {
      title = "Error !!";
      message = "Ad status update failed.Try again";
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

    router.push("/ads");
  };

  return (
    <div className="flex flex-col min-w-full min-h-screen bg-gray-100">
      <Head>
        <title>User Ad Page</title>
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
        {!loader && !DataState && (
          <div className="w-full h-full py-5 my-5 px-4 flex flex-col justify-center items-center">
            <h2 className="text-xl md:text-4xl font-medium pb-1">
              Oops!! No Data Found
            </h2>
            <p className="text-lg md:text-2xl text-gray-500">
              Please try with correct ad ID or correct link
            </p>
          </div>
        )}
        {DataState && !modalState && (
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
                <h2 className="capitalize text-2xl md:text-4xl font-bold">
                  {DataState.title}
                </h2>

                <div className="md:w-3/4 w-auto flex flex-row bg-blue-900 px-3 py-1 my-1 rounded-lg capitalize">
                  {DataState.adStatus === "verified" && (
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
                  {DataState.adStatus === "unverified" && (
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

                  <p className="text-white text-md">{DataState.adStatus}</p>
                </div>
              </div>
            </div>
            {/* lower div */}
            <div className="flex flex-col p-5 my-5 bg-white rounded shadow-md">
              <h2 className="text-2xl md:text-3xl font-semibold my-1">
                Ad Info
              </h2>
              <FakeInput label="Ad Title" text={DataState.title} />
              <FakeInput label="Ad Description" text={DataState.description} />
              <FakeInput label="Ad Price" text={DataState.price + "Rs"} />
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

              <FakeInput label="Username" text={DataState.username} />
              <FakeInput label="Email" text={DataState.email} />
              <FakeInput label="Contact No" text={DataState.contact} />
              <FakeInput label="Address" text={DataState.address} />
              <FakeInput label="State" text={DataState.state} />
              <FakeInput label="City" text={DataState.city} />
              <FakeInput label="Pin code" text={DataState.pinCode} />
              {/* button grp */}
              <div className="flex flex-col md:flex-row my-1 px-2">
                {DataState.adStatus === "unverified" ? (
                  <Button
                    onClick={() => {
                      askUpdateAd("verified");
                    }}
                    classes="flex flex-row items-center justify-center border-0 bg-blue-900 text-white transform hover:scale-95 smooth-trans md:my-0 my-2"
                  >
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
                ) : (
                  <Button
                    onClick={() => {
                      askUpdateAd("unverified");
                    }}
                    classes="flex flex-row items-center justify-center border-0 bg-red-900 text-white transform hover:scale-95 smooth-trans md:my-0 my-2"
                  >
                    Unverify Ad
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
                <Button classes="flex flex-row items-center justify-center border-blue-900 text-blue-900 transform hover:scale-95 smooth-trans md:my-0 my-2">
                  <a href={`mailto:${DataState.email}`}>Contact Via Email</a>
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
                  onClick={deleteAd}
                  classes="flex flex-row items-center justify-center border-red-900 text-red-900 transform hover:scale-95 smooth-trans md:my-0 my-2"
                >
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
        )}
      </Layout>
    </div>
  );
}
