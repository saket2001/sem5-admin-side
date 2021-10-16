import React from "react";

export default function InfoCard({
  userData,
  unVerifiedUsers,
  adData,
  unVerifiedads,
}) {
  return (
    <div className="w-full mx-auto my-3 grid grid-cols-2 md:grid-cols-4 p-3 bg-white rounded-lg shadow-sm gap-2">
      <div className="flex flex-col justify-center items-center px-2 py-1">
        <h2 className="h2  md:text-5xl">{userData.length}</h2>
        <p className="p md:text-xl">Total User Accounts</p>
      </div>
      <div className="flex flex-col justify-center items-center px-2 py-1">
        <h2 className="h2  md:text-5xl">{adData.length}</h2>
        <p className="p md:text-xl">Total Ads Posted</p>
      </div>
      <div className="flex flex-col justify-center items-center px-2 py-1">
        <h2 className="h2  md:text-5xl">{unVerifiedads.length}</h2>
        <p className="p md:text-xl">Unverified Ads</p>
      </div>
      <div className="flex flex-col justify-center items-center px-2 py-1">
        <h2 className="h2  md:text-5xl">{unVerifiedUsers.length}</h2>
        <p className="p md:text-xl">Unverified Users</p>
      </div>
    </div>
  );
}
