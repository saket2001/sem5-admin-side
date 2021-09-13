import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/auth";
import Button from "./Button";

export default function Drawer() {
  const dispatch = useDispatch(authActions);
  const router = useRouter();

  const LoggedInData = useSelector((state) => state.auth.userData);

  const logoutHandler = () => {
    dispatch(authActions.updateUserData({}));
    dispatch(authActions.updateUserStatus());
    router.replace("/");
  };

  return (
    <div className="hidden md:flex md:flex-col justify-between md:w-60 md:bg-blue-900 md:min-h-screen md:py-4 md:text-white md:shadow-lg z-0">
      <div className="flex flex-col py-3 px-4">
        <h2 className="capitalize text-2xl p-1">
          {LoggedInData ? LoggedInData.name : "User"}
        </h2>
        <p className="text-lg p-1 text-gray-200">{new Date().toDateString()}</p>
        <div className="flex flex-col justify-start py-5 mt-2">
          <p className="flex flex-row items-center text-xl my-1 p-1 py-2 rounded-md hover:bg-blue-700 smooth-trans">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <Link href={{ pathname: "/", query: "logged=true" }}>
              Dashboard
            </Link>
          </p>
          <p className="flex flex-row items-center text-xl my-1 p-1 py-2 rounded-md hover:bg-blue-700 smooth-trans">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <Link href="/users">Users</Link>
          </p>
          <p className="flex flex-row items-center text-xl my-1 p-1 py-2 rounded-md hover:bg-blue-700 smooth-trans">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <Link href="/ads">Ads</Link>
          </p>
        </div>
      </div>

      <div className="relative bottom-0 py-3 px-2">
        <Button
          classes="transform hover:scale-95 smooth-trans"
          onClick={logoutHandler}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
