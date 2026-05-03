import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Color system tokens
export const colors = {
  primary: "rgb(255, 107, 107)", // #FF6B6B - Airbnb red
  primaryLight: "rgb(255, 239, 239)",
  secondary: "rgb(31, 41, 55)", // #1F2937 - Deep gray
  accent: "rgb(59, 130, 246)", // #3B82F6 - Blue
  success: "rgb(16, 185, 129)", // #10B981 - Green
  error: "rgb(239, 68, 68)", // #EF4444 - Red
  muted: "rgb(156, 163, 175)", // #9CA3AF - Gray
} as const;
