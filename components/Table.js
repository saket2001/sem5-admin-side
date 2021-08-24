import Link from "next/link";
import React from "react";
import Button from "./Button";

export default function Table({ heading }) {
  return (
    <div className="card">
      <h2 className="h4 my-2">{heading}</h2>
      <div className="table w-full py-4 px-2 border-collapse border-2 border-red-700">
        <div className="table-row-group">
          <div className="table-row border-2 border-red-700 bg-red-700 text-white">
            <div className="table-cell p-2 font-medium">Sr no</div>
            <div className="table-cell p-2 font-medium">Name</div>
            <div className="table-cell p-2 font-medium">Action</div>
          </div>
          <div className="table-row hover:bg-gray-200 ">
            <div className="table-cell p-2 text-red-700">1</div>
            <div className="table-cell p-2 text-red-700">Mary Shine</div>
            <div className="table-cell p-2 text-red-700">
              <Button classes="md:w-1/2 w-auto border-red-700 text-red-700 cursor-pointer border-2 hover:bg-red-700 hover:text-white">
                <Link href="/ads">Verify</Link>
              </Button>
            </div>
          </div>
          <div className="table-row hover:bg-gray-200 ">
            <div className="table-cell p-2 text-red-700">1</div>
            <div className="table-cell p-2 text-red-700">Mary Shine</div>
            <div className="table-cell p-2 text-red-700">
              <Button classes="md:w-1/2 w-auto border-red-700 text-red-700 cursor-pointer border-2 hover:bg-red-700 hover:text-white">
                <Link href="/ads">Verify</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
