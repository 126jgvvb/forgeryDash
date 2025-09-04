// src/components/ui/Button.jsx
import React from "react";
import clsx from "clsx";

export const Button = ({ children, size = "md", ...props }) => {
  return (
    <button
      className={clsx(
        "bg-red-600 text-white rounded-md shadow hover:bg-green-700 transition",
        size === "sm" && "px-3 py-1 text-sm",
        size === "md" && "px-4 py-2 text-base"
      )}
      {...props}
    >
      {children}
    </button>
  );
};
