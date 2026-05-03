"use client";

import { useState } from "react";

interface DeleteButtonProps {
  id: string;
  onDelete: (id: string) => void;
}

export default function DeleteButton({ id, onDelete }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Delete this listing?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete(id);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50">
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
