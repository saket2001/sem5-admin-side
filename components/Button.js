import React from "react";

export default function Button({ children, classes, onClick }) {
  const styles = `w-auto cursor-pointer mx-2 px-4 py-1 md:py-2 text-lg md:text-xl text-center rounded-lg ${classes}`;

  return (
    <button className={styles} onClick={onClick}>
      {children}
    </button>
  );
}
