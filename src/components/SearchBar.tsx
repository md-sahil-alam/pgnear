"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  total: number;
};

export default function SearchBar({
  search,
  onSearchChange,
  total,
}: SearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="relative w-full md:max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search PG name or locality..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <p className="text-sm text-gray-500">
        Showing <span className="font-semibold">{total}</span> listing
        {total !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
