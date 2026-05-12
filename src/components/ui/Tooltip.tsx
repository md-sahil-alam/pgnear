"use client";
import { useState } from "react";
import { Info } from "lucide-react";

export function Tooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block ">
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="ml-1 text-gray-400 hover:text-gray-600 text-xs">
        <Info size={16} />
      </button>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-52 text-xs text-white bg-gray-900 rounded-md px-3 py-2 shadow-lg z-50">
          {text}
        </div>
      )}
    </div>
  );
}
