import React from "react";

export default function InfoCard() {
  return (
    <div className="w-full mx-auto my-3 grid grid-cols-2 md:grid-cols-4 p-3 bg-white rounded-lg shadow-md gap-2">
      <div className="flex flex-col justify-center items-center px-2 py-1">
        <h2 className="h2  md:text-5xl">20</h2>
        <p className="p md:text-xl">Active Users</p>
      </div>
      <div className="flex flex-col justify-center items-center px-2 py-1">
        <h2 className="h2  md:text-5xl">50</h2>
        <p className="p md:text-xl">Active Ads</p>
      </div>
      <div className="flex flex-col justify-center items-center px-2 py-1">
        <h2 className="h2  md:text-5xl">5</h2>
        <p className="p md:text-xl">Pending Ads</p>
      </div>
      <div className="flex flex-col justify-center items-center px-2 py-1">
        <h2 className="h2  md:text-5xl">2</h2>
        <p className="p md:text-xl">Pending Users</p>
      </div>
    </div>
  );
}
