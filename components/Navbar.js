import React from "react";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/auth";

export default function Navbar({ activeLink }) {
  const dispatch = useDispatch(authActions);
  const router = useRouter();

  const LoggedInData = useSelector((state) => state.auth.userData);

  const logoutHandler = () => {
    dispatch(authActions.updateUserData({}));
    dispatch(authActions.updateUserStatus());
    router.replace("/");
  };
  return (
    <div className="md:hidden flex w-full flex-col p-2 md:p-3 px-4 text-white text-sm md:text-lg bg-blue-900">
      <div className="w-full flex flex-row justify-between items-center py-2 md:py-1">
        <div className="flex flex-col">
          <h2 className="text-2xl px-2">
            {LoggedInData ? LoggedInData.name : ""}
          </h2>
          <p className="text-lg text-gray-200  px-2">
            {new Date().toDateString()}
          </p>
        </div>
        <Button
          classes="transform hover:scale-95 smooth-trans border-2 border-white"
          onClick={logoutHandler}
        >
          Logout
        </Button>
      </div>
      <div className="w-full flex flex-row items-center py-2 md:py-1 ">
        <p className="flex flex-row items-center text-xl mx-1 p-2 rounded-md hover:bg-blue-700 smooth-trans">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-1"
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
          <Link href="/">Dashboard</Link>
        </p>
        <p className="flex flex-row items-center text-xl mx-1 p-2  rounded-md hover:bg-blue-700 smooth-trans">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-1"
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
        <p className="flex flex-row items-center text-xl mx-1 p-2 rounded-md hover:bg-blue-700 smooth-trans">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-1"
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
  );
}
