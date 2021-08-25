import React, { useState } from "react";
import Button from "./Button";

export default function Sort() {
  const [sortState, setSortState] = useState(true);
  const activeIcon = sortState ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 mx-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 mx-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
      />
    </svg>
  );

  const changeSort = () => {
    setSortState((prevState) => !prevState);
  };
  return (
    <div className="flex flex-row px-4 py-2 my-2 justify-end">
      <Button
        classes="flex flex-row items-center border-gray-900 text-gray-900 px-4 transform hover:scale-95 smooth-trans"
        onClick={changeSort}
      >
        Sort
        {activeIcon}
      </Button>
    </div>
  );
}
