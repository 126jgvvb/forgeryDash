import React from "react";
import clsx from "clsx";

/**
 * Props:
 * - type: "text", "tel", etc.
 * - value, onChange
 * - placeholder
 * - className: optional extra classes
 */
export function Input({ className, ...props }) {
  return (
    <input
      className={clsx(
        "w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 focus:outline-none transition",
        className
      )}
      {...props}
    />
  );
}
