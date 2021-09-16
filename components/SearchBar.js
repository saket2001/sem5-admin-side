import React from "react";
import Button from "./Button";
import { useRef } from "react";

export default function SearchBar({ sendInput }) {
  const searchRef = useRef("");

  const getInput = () => {
    // console.log(searchRef.current.value);
    sendInput(searchRef.current.value);
  };

  return (
    <div className="w-ful md:w-3/4 bg-white my-1 px-2 flex text-gray-600 text-lg md:text-xl rounded-lg border focus:border-blue-900 hover:border-blue-900 shadow-sm">
      <input
        type="search"
        ref={searchRef}
        onChange={getInput}
        placeholder="Search By Name"
        className="w-full p-2 mx-1 border-0 outline-none rounded-md"
      />
      <Button
        onClick={getInput}
        classes="border-0 flex items-center smooth-trans"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 ml-1 hover:transform hover:scale-95 smooth-trans"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </Button>
    </div>
  );
}
