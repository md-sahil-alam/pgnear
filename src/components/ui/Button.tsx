import { cn } from "@/lib/cn";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variants = {
      default:
        "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400",
      outline:
        "border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100",
      ghost: "text-gray-700 hover:bg-gray-100 active:bg-gray-200",
      danger:
        "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-400",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded",
      md: "px-4 py-2 text-base rounded",
      lg: "px-6 py-3 text-lg rounded-lg",
    };

    return (
      <button
        className={cn(
          "font-medium transition-colors duration-200 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
