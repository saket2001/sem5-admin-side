import React from "react";
import Button from "./Button";

export default function Modal({ title, message, closeModal, closeOnOk }) {
  return (
    <>
      {/* overlay */}
      <div className="w-full h-full bg-gray-300 fixed z-10"></div>
      {/* modal div */}
      <div className="w-full h-full flex items-center justify-center">
        {/* modal */}
        <div className="mx-2 w-auto md:w-1/2 space-y-2 px-4 py-3 bg-white rounded-md shadow-md flex flex-col z-20">
          {/* title */}
          <div className="capitalize font-medium text-gray-600 text-xl md:text-2xl border-b-2 border-blue-900 p-2">
            {title}
          </div>
          {/* message */}
          <div className="text-gray-500 text-md md:text-xl p-2">{message}</div>
          {/* buttons */}
          <div className="flex">
            <Button
              onClick={closeOnOk}
              classes="bg-blue-900 text-white smooth-trans hover:scale-95 border-0"
            >
              Ok
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </div>
        </div>
      </div>
    </>
  );
}
