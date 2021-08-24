import React from "react";
import Button from "./Button";
import Link from "next/link";

export default function Navbar({ activeLink }) {
  return (
    <div className="md:hidden flex w-full flex-col p-2 md:p-3 px-4 text-white text-sm md:text-lg bg-blue-700">
      <div className="w-full flex flex-row justify-between items-center py-2 md:py-1">
        <div className="flex flex-col">
          <h2 className="text-2xl px-2">Welcome, John Doe</h2>
          <p className="text-lg text-gray-200  px-2">
            {new Date().toDateString()}
          </p>
        </div>
        <Button classes="hover:bg-red-700 hover:border-red-700 ">Logout</Button>
      </div>
      <div className="w-full flex flex-row items-center py-2 md:py-1 ">
        <p className="text-xl px-2 mr-2">
          <Link href={{ pathname: "/", query: "logged=true" }}>Dashboard</Link>
        </p>
        <p className="text-xl px-2 mr-2">
          <Link href={{ pathname: "/users", query: "logged=true" }}>
            All Users
          </Link>
        </p>
        <p className="text-xl px-2  mr-2">
          <Link href={{ pathname: "/ads", query: "logged=true" }}>All Ads</Link>
        </p>
      </div>
    </div>
  );
}
