"use client";

import { useState } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import ToggleButton from "./ToggleButton";

interface Listing {
  _id: string;
  title: string;
  price: number;
  gender: string;
  isActive: boolean;
  isVerified: boolean;
}

interface ListingsTableProps {
  initialListings: Listing[];
}

export default function ListingsTable({ initialListings }: ListingsTableProps) {
  const [listings, setListings] = useState<Listing[]>(initialListings);

  const handleDelete = (id: string) => {
    setListings(listings.filter((item) => item._id !== id));
  };

  const handleToggle = (id: string, field: string, newValue: boolean) => {
    setListings(
      listings.map((item) =>
        item._id === id ? { ...item, [field]: newValue } : item,
      ),
    );
  };

  return (
    <table className="w-full border">
      <thead>
        <tr className="border-b bg-gray-100">
          <th className="p-2 text-left">Title</th>
          <th className="p-2">Price</th>
          <th className="p-2">Gender</th>
          <th className="p-2">Active</th>
          <th className="p-2">Verified</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {listings.map((item) => (
          <tr key={item._id} className="border-b hover:bg-gray-50">
            <td className="p-2">{item.title}</td>
            <td className="p-2 text-center">₹{item.price}</td>
            <td className="p-2 text-center capitalize">{item.gender}</td>
            <td className="p-2 text-center">
              <ToggleButton
                id={item._id}
                field="isActive"
                value={item.isActive}
                onToggle={handleToggle}
              />
            </td>
            <td className="p-2 text-center">
              <ToggleButton
                id={item._id}
                field="isVerified"
                value={item.isVerified}
                onToggle={handleToggle}
              />
            </td>
            <td className="p-2 text-center space-x-2">
              <EditButton id={item._id} />
              <DeleteButton id={item._id} onDelete={handleDelete} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
