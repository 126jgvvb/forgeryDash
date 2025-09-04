import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge conditional class names with Tailwind
 * Example: cn("px-2", isActive && "bg-blue-500")
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
