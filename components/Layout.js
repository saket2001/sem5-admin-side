import React from "react";
import Drawer from "./Drawer";
import Navbar from "./Navbar";

export default function Layout({ activeLink, children }) {
  return (
    <div className="flex flex-row w-full">
      <Drawer />
      <div className="flex flex-col w-full md:px-2">
        <Navbar activeLink={activeLink} />
        {children}
      </div>
      {/* footer */}
    </div>
  );
}
