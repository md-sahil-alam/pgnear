"use client";

import { useState } from "react";

interface ToggleButtonProps {
  id: string;
  field: "isActive" | "isVerified";
  value: boolean;
  onToggle: (id: string, field: string, newValue: boolean) => void;
}

export default function ToggleButton({
  id,
  field,
  value,
  onToggle,
}: ToggleButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !value }),
      });

      if (res.ok) {
        const data = await res.json();
        onToggle(id, field, data.listing[field]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm ${
        value ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
      } hover:opacity-80 disabled:opacity-50`}
      title={`${field === "isActive" ? "Active" : "Verified"}: ${
        value ? "Yes" : "No"
      }`}>
      {loading ? "..." : value ? "✓" : "○"}
    </button>
  );
}
