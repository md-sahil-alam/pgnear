import { cn } from "@/lib/cn";
import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "w-full px-4 py-2 border border-gray-300 rounded-lg bg-white",
        "focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
        "disabled:bg-gray-100 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  ),
);
Select.displayName = "Select";

export { Select };
