import React from "react";

export default function FakeInput(props) {
  return (
    <div className="flex flex-col my-1 px-4 py-2">
      <p className="text-gray-700 font-medium text-lg md:text-xl my-1">
        {props.label}
      </p>
      {props.text.length > 0 ? (
        <div className="w-auto md:w-1/2 rounded-sm bg-gray-100 shadow px-3 py-2 my-1">
          <p className=" text-gray-600 text-lg md:text-xl">{props.text}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
