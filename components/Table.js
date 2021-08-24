import Link from "next/link";
import React from "react";
import Button from "./Button";

export default function Table({ heading }) {
  return (
    <div className="card">
      <h2 className="h4 my-2">
        {heading}
        <span className="text-base text-gray-500 mx-2">( total 5 )</span>
      </h2>
      <div className="table w-full py-4 px-2 border-collapse border-2 border-gray-300 text-gray-700">
        <div className="table-row-group">
          <div className="table-row border-2 border-gray-300 text-blue-700">
            <div className="table-cell text-center p-2 font-medium">Sr no</div>
            <div className="table-cell text-center p-2 font-medium">Name</div>
            <div className="table-cell text-center p-2 font-medium">Action</div>
          </div>
          <div className="table-row hover:bg-gray-200 ">
            <div className="table-cell text-center p-2">1</div>
            <div className="table-cell text-center p-2">Mary Shine</div>
            <div className="table-cell justify-center p-2">
              <Button classes="md:w-1/2 mx-auto w-auto justify-center text-blue-700 cursor-pointer border-2 hover:bg-blue-700 border-blue-700 hover:text-white">
                <Link href="/ads">Verify</Link>
              </Button>
            </div>
          </div>
          <div className="table-row hover:bg-gray-200 ">
            <div className="table-cell text-center p-2">1</div>
            <div className="table-cell text-center p-2">Mary Shine</div>
            <div className="table-cell text-center p-2">
              <Button classes="md:w-1/2 mx-auto text-blue-700 cursor-pointer border-2 hover:bg-blue-700 border-blue-700 hover:text-white">
                <Link href="/ads">Verify</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
