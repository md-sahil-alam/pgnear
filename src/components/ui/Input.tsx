import { cn } from "@/lib/cn";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full px-4 py-2 border border-gray-300 rounded-lg",
        "focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
        "placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
