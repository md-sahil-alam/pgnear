"use client";

import { useMemo, useState } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import ToggleButton from "./ToggleButton";
import { BadgeCheck, CircleCheckBig, CircleOff, Search } from "lucide-react";
import { formatGender } from "@/lib/gender";

interface Listing {
  _id: string;
  title: string;

  gender: string;
  isActive: boolean;
  isVerified: boolean;
}

interface ListingsTableProps {
  initialListings: Listing[];
}

export default function ListingsTable({ initialListings }: ListingsTableProps) {
  const [listings, setListings] = useState<Listing[]>(initialListings);

  const [search, setSearch] = useState("");

  const handleDelete = (id: string) => {
    setListings((prev) => prev.filter((item) => item._id !== id));
  };

  const handleToggle = (id: string, field: string, newValue: boolean) => {
    setListings((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, [field]: newValue } : item,
      ),
    );
  };

  // Filtered Listings
  const filteredListings = useMemo(() => {
    return listings.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [listings, search]);

  return (
    <div className="space-y-5">
      {/* Search + Count */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Count */}
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {filteredListings.length}
          </span>{" "}
          listings
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                Listing
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                Gender
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                Active
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                Verified
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredListings.length > 0 ? (
              filteredListings.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition">
                  {/* Title */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                        <BadgeCheck size={18} className="text-blue-600" />
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900 line-clamp-1">
                          {item.title}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          ID: {item._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Gender */}
                  <td className="px-5 py-4 text-center">
                    <span className="capitalize px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                      {formatGender(item.gender)}
                    </span>
                  </td>

                  {/* Active */}
                  <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {item.isActive ? (
                        <CircleCheckBig
                          size={18}
                          className="text-emerald-500"
                        />
                      ) : (
                        <CircleOff size={18} className="text-red-500" />
                      )}

                      <ToggleButton
                        id={item._id}
                        field="isActive"
                        value={item.isActive}
                        onToggle={handleToggle}
                      />
                    </div>
                  </td>

                  {/* Verified */}
                  <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {item.isVerified ? (
                        <CircleCheckBig size={18} className="text-violet-500" />
                      ) : (
                        <CircleOff size={18} className="text-gray-400" />
                      )}

                      <ToggleButton
                        id={item._id}
                        field="isVerified"
                        value={item.isVerified}
                        onToggle={handleToggle}
                      />
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <EditButton id={item._id} />

                      <DeleteButton id={item._id} onDelete={handleDelete} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-14 text-center text-gray-500">
                  No listings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
