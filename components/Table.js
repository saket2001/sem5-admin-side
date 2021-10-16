import Link from "next/link";
import React from "react";
import Button from "./Button";

export default function Table({ heading, data, option }) {
  const tableContent = data.map((d) => (
    <div className="table-row hover:bg-gray-200 smooth-trans ">
      <div className="truncate table-cell text-center p-1">
        {d._id.toString().slice(0, 10) + "..."}
      </div>
      {option && <div className="table-cell text-center p-2">{d.title}</div>}
      {!option && (
        <div className="table-cell text-center p-2">{d.fullName}</div>
      )}
      <div className="table-cell text-center p-2">
        <Button classes="md:w-3/4 mx-auto text-blue-900 cursor-pointer border-2 hover:bg-blue-900 text-center border-blue-900 hover:text-white smooth-trans">
          {!option && <Link href={`/users/${d._id}`}>View</Link>}
          {option && <Link href={`/ads/${d._id}`}>View</Link>}
        </Button>
      </div>
    </div>
  ));

  return (
    <div className="card">
      <h2 className="h4 my-2">
        {heading}
        <span className="text-base text-gray-500 mx-2">
          ( total {data.length} )
        </span>
      </h2>
      <div className="table w-full py-4 px-2 border-collapse border-2 border-gray-300 text-gray-700">
        <div className="table-row-group">
          <div className="table-row border-2 border-gray-300 text-black font-medium">
            <div className=" table-cell text-center p-2 font-medium">Id</div>
            <div className="table-cell text-center p-2 font-medium">Name</div>
            <div className="table-cell text-center p-2 font-medium">Action</div>
          </div>
          {tableContent}
        </div>
      </div>
    </div>
  );
}
