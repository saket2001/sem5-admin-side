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

export default function contactPage() {
  useSession();
  const isLoggedIn = useSelector((state) => state.auth.status);
  const token = useSelector((state) => state.auth.token);

  const [modal, setModal] = useState("");
  const [loader, setLoader] = useState(true);
  const [modalState, setModalState] = useState(false);
  const [formData, setFormData] = useState(null);

  const router = useRouter();
  const formId = router.query.contactFormId;

  // start loader and fetch user detail
  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      const res = await fetch(
        `https://bechdal-api.herokuapp.com/api/v1/get-contact-form/${formId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);

      setFormData(data.data);

      // turn off loader
      setLoader(false);
    };

    getData();
  }, [formId]);

  const closeModal = () => {
    setModalState(false);
  };

  const confirmDelete = async () => {
    // delete user
    const res = await fetch(
      `https://bechdal-api.herokuapp.com/api/v1/delete-contact-form/${formId}`,
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
      message = "User Contact Form deleted by admin successfully";
    } else {
      title = "Error !!";
      message = "User Contact Form was not deleted successfully.Try again";
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
    router.push("/contact");
  };

  const deleteUser = () => {
    setModal(
      <Modal
        title="Confirm To delete?"
        message="Are you sure you want to delete the following User Contact Form?"
        closeModal={closeModal}
        closeOnOk={confirmDelete}
      />
    );
    setModalState(true);
  };

  return (
    <>
      {!isLoggedIn && <SignIn />}
      {isLoggedIn && (
        <div className="flex flex-col min-w-full min-h-screen bg-gray-100 z-0">
          <Head>
            <title>Contact Form Page</title>
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
            {!loader && !formData && (
              <div className="w-full h-full py-5 my-5 px-4 flex flex-col justify-center items-center">
                <h2 className="text-xl md:text-4xl font-medium pb-1">
                  Oops!! No Data Found
                </h2>
                <p className="text-lg md:text-2xl text-gray-500">
                  Please try with correct form ID or correct link
                </p>
              </div>
            )}
            {formData && !modalState && (
              <main className="flex flex-col px-2 my-2 text-gray-700">
                <div className="flex flex-col p-5 my-5 bg-white rounded shadow-md">
                  <h2 className="text-2xl md:text-3xl font-semibold my-1">
                    Form Details
                  </h2>
                  <FakeInput
                    label="User Full Name"
                    text={useDecrypt(formData.fullName)}
                  />
                  <FakeInput
                    label="User email ID"
                    text={useDecrypt(formData.email)}
                  />
                  <FakeInput
                    label="User Contact No"
                    text={useDecrypt(formData.contact)}
                  />
                  <FakeInput
                    label="Message"
                    text={useDecrypt(formData.message)}
                  />

                  {/* button grp */}
                  <div className="flex flex-col md:flex-row my-1 px-2">
                    <Button classes="flex flex-row items-center justify-center border-2 border-blue-900 text-blue-900 transform hover:scale-95 smooth-trans md:my-0 my-2">
                      <a href={`mailto:${formData.email}`}>Contact Via Email</a>
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
                      Delete Form
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
      )}
    </>
  );
}
