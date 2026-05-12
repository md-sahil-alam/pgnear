"use client";

import { useState } from "react";
import FilterPanel from "./FilterPanel";

export default function FiltersWrapper({ filters, setFilters }: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-black text-white py-2 rounded-lg">
          Filters
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <FilterPanel filters={filters} setFilters={setFilters} />
      </div>

      {/*  Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* Bottom Sheet */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            {/* Your existing panel */}
            <FilterPanel filters={filters} setFilters={setFilters} />

            {/* Optional close CTA */}
            <button
              onClick={() => setOpen(false)}
              className="w-full bg-black text-white py-2 rounded mt-4">
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
