import React from "react";

export default function InfoCard() {
  return (
    <div className="w-full mx-auto my-3 grid grid-cols-2 md:grid-cols-4 p-3 bg-white rounded-lg shadow-md">
      <div className="flex flex-col justify-center items-center m-2 px-3 py-2">
        <h2 className="h2">20</h2>
        <p className="p md:text-xl">Active Users</p>
      </div>
      <div className="flex flex-col justify-center items-center m-2 px-3 py-2">
        <h2 className="h2">50</h2>
        <p className="p md:text-xl">Active Ads</p>
      </div>
      <div className="flex flex-col justify-center items-center m-2 px-3 py-2">
        <h2 className="h2">5</h2>
        <p className="p md:text-xl">Pending Ads</p>
      </div>
      <div className="flex flex-col justify-center items-center m-2 px-3 py-2">
        <h2 className="h2">2</h2>
        <p className="p md:text-xl">Pending Users</p>
      </div>
    </div>
  );
}
