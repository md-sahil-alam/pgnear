"use client";
import { Tooltip } from "./ui/Tooltip";
import SaveButton from "@/components/SaveButton";

interface ListingHeaderProps {
  title: string;
  listingId: string;
}

export default function ListingHeader({
  title,
  listingId,
}: ListingHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>

        <SaveButton listingId={listingId} size="md" showLabel={true} />
      </div>
    </>
  );
}
