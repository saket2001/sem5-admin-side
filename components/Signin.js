import Head from "next/head";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/auth";
import Loader from "./Loader";
import Modal from "./Modal";

export default function signIn() {
  const [LoaderState, setLoaderState] = useState(null);
  const [modalState, setModalState] = useState(null);
  const [modalData, setModalData] = useState(null);
  const dispatch = useDispatch(authActions);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const closeModal = () => {
    setModalState((prevState) => !prevState);
  };

  const formHandler = async (e) => {
    setLoaderState(true);
    // get data from form
    e.preventDefault();
    const data = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    // post data via api
    const res = await fetch(
      "https://bechdal-api.herokuapp.com/api/v1/admin/sign-in",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const userData = await res.json();

    // check data
    if (userData.type) {
      console.log(userData);
      dispatch(authActions.updateUserData(userData.data));
      dispatch(authActions.updateUserStatus(true));
      // adding session
      window.sessionStorage.setItem("IsLoggedIn", "true");
      window.sessionStorage.setItem("LoggedId", userData.data.id);
      window.sessionStorage.setItem("LoggedName", userData.data.name);
    } else {
      setLoaderState(false);
      setModalState(true);
      setModalData(
        <Modal
          title="Error !!"
          message="Admin login has failed.Please try again with correct details"
          closeOnOk={closeModal}
          closeModal={closeModal}
        />
      );
    }
  };

  return (
    <>
      {LoaderState && (
        <div className="w-full h-screen flex justify-center items-center text-2xl text-gray-700 font-medium">
          <Loader />
        </div>
      )}
      {modalState && (
        <div className="w-full h-screen flex justify-center items-center text-2xl text-gray-700 font-medium">
          {modalData}
        </div>
      )}
      <div className="min-w-screen min-h-screen overflow-hidden bg-gradient-to-b md:bg-gradient-to-r from-blue-900 via-indigo-500 to-indigo-200 flex flex-col justify-center items-center">
        <Head>
          <title>Admin Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="mx-2 p-5 md:px-10 flex flex-col justify-center items-center bg-white rounded-lg shadow-md">
          <h2 className="h2">Sign In To Your Account</h2>
          <form className="w-full mt-8 space-y-6" onSubmit={formHandler}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  ref={emailRef}
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg md:text-xl"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  ref={usernameRef}
                  name="username"
                  type="password"
                  autoComplete="off"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg md:text-xl"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  ref={passwordRef}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg md:text-xl"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
