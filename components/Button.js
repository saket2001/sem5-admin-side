import React from "react";

export default function Button({ children }) {
  return (
    <div className="mx-2 px-4 py-1 md:py-2 text-lg md:text-xl text-white border-2 border-white rounded-lg hover:bg-red-700 hover:border-red-700">
      {children}
    </div>
  );
}
