import Link from "next/link";
import React from "react";
import Button from "./Button";

export default function Table({ heading, data }) {
  const tableContent = data.map((d) => (
    <div className="table-row hover:bg-gray-200 smooth-trans ">
      <div className="table-cell text-center p-2">{d.id}</div>
      <div className="table-cell text-center p-2">{d.name}</div>
      <div className="table-cell text-center p-2">
        <Button classes="md:w-3/4 mx-auto text-blue-900 cursor-pointer border-2 hover:bg-blue-900 border-blue-900 hover:text-white smooth-trans">
          <Link href={d.buttonLink}>{d.buttonText}</Link>
        </Button>
      </div>
    </div>
  ));

  return (
    <div className="card">
      <h2 className="h4 my-2">
        {heading}
        <span className="text-base text-gray-500 mx-2">( total 5 )</span>
      </h2>
      <div className="table w-full py-4 px-2 border-collapse border-2 border-gray-300 text-gray-700">
        <div className="table-row-group">
          <div className="table-row border-2 border-gray-300 text-black font-medium">
            <div className="table-cell text-center p-2 font-medium">Id</div>
            <div className="table-cell text-center p-2 font-medium">Name</div>
            <div className="table-cell text-center p-2 font-medium">Action</div>
          </div>
          {tableContent}
        </div>
      </div>
    </div>
  );
}
