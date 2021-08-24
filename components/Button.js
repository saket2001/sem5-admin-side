import React from "react";

export default function Button({ children, classes }) {
  const styles = `mx-2 px-4 py-1 md:py-2 text-lg md:text-xl text-center text-white border-2 border-white rounded-lg ${classes}`;

  return <div className={styles}>{children}</div>;
}
