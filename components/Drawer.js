import Link from "next/link";
import React from "react";
import Button from "./Button";

export default function Drawer() {
  return (
    <div className="hidden md:flex md:flex-col justify-between md:w-60 md:bg-blue-700 md:min-h-screen md:py-4 md:text-white md:shadow-lg">
      <div className="flex flex-col py-3 px-4">
        <h2 className="text-xl p-1 text-gray-100">Welcome, Admin</h2>
        <p className="text-3xl p-1">John Doe</p>
        <div className="flex flex-col justify-start py-5 mt-5">
          <p className="text-xl my-1 p-1 rounded-md hover:bg-blue-600">
            <Link href={{ pathname: "/", query: "logged=true" }}>
              Dashboard
            </Link>
          </p>
          <p className="text-xl my-1 p-1 rounded-md hover:bg-blue-600">
            <Link href={{ pathname: "/users", query: "logged=true" }}>
              Users
            </Link>
          </p>
          <p className="text-xl my-1 p-1 rounded-md hover:bg-blue-600">
            <Link href={{ pathname: "/ads", query: "logged=true" }}>Ads</Link>
          </p>
        </div>
      </div>

      <div className="relative bottom-0">
        <Button classes="hover:bg-blue-600 hover:border-blue-600">
          Logout
        </Button>
      </div>
    </div>
  );
}
