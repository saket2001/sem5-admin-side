import React from "react";

export default function Loader() {
  return (
    <div className="flex flex-col">
      <div className="w-20 h-20 md:w-24 md:h-24 border-8 rounded-full border-gray-300 border-t-8 border-t-black rotate"></div>
      <p>Loading..</p>
    </div>
  );
}
