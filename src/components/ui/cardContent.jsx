import React from "react";
import clsx from "clsx";

/**
 * Card content area with optional spacing
 */
export function CardContent({ children, className }) {
  return (
    <div className={clsx("space-y-4", className)}>
      {children}
    </div>
  );
}
