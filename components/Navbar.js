import React from "react";
import Button from "./Button";
import Link from "next/link";

export default function Navbar({ activeLink }) {
  return (
    <div className="flex w-full flex-col p-2 md:p-3 px-4 text-white text-sm md:text-lg bg-red-500">
      <div className="w-full flex flex-row justify-between items-center py-2 md:py-1">
        <h2 className="text-2xl uppercase md:text-3xl px-2">
          John Doe
          <span className="text-sm md:text-lg font-semibold text-gray-100 mx-2">
            {new Date().toLocaleDateString()}
          </span>
        </h2>
        <Button>Logout</Button>
      </div>
      <div className="w-full flex flex-row items-center py-2 md:py-1">
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
