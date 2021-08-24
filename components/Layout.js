import React from "react";
import Navbar from "./Navbar";

export default function Layout({ activeLink, children }) {
  return (
    <>
      <Navbar activeLink={activeLink} />
      {children}
      {/* footer */}
    </>
  );
}
