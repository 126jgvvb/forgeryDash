import React from "react";
import clsx from "clsx";

/**
 * Card wrapper for content
 */
export function Card({ children, className }) {
  return (
    <div
      className={clsx(
        "bg-white shadow-lg rounded-2xl p-4",
        className
      )}
    >
      {children}
    </div>
  );
}
