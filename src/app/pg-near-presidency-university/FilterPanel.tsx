"use client";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function FilterPanel({
  filters,
  setFilters,
}: {
  filters: {
    minPrice: number;
    maxPrice: number;
    gender: string;
    amenities: string[];
  };
  setFilters: any;
}) {
  return (
    <div className="bg-white rounded-xl p-5 h-fit lg:sticky lg:top-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Price */}
      <div className="mb-5">
        <p className="text-sm font-medium mb-2">Price Range</p>
        <div className="px-2">
          <Slider
            range
            min={0}
            max={50000}
            step={500}
            value={[filters.minPrice, filters.maxPrice]}
            onChange={(value) => {
              const [min, max] = value as [number, number];
              setFilters((prev: any) => ({
                ...prev,
                minPrice: min,
                maxPrice: max,
              }));
            }}
            trackStyle={[{ backgroundColor: "#000" }]}
            handleStyle={[{ borderColor: "#000" }, { borderColor: "#000" }]}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>₹{filters.minPrice}</span>
            <span>₹{filters.maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Gender */}
      <div className="mb-5">
        <p className="text-sm font-medium mb-2">Gender</p>

        <div className="flex gap-2">
          {["all", "male", "female"].map((g) => (
            <button
              key={g}
              onClick={() =>
                setFilters((prev: any) => ({ ...prev, gender: g }))
              }
              className={`px-3 py-1 rounded border ${
                filters.gender === g
                  ? "bg-black text-white"
                  : "bg-white text-gray-600"
              }`}>
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      {/* <div className="mb-5">
        <p className="text-sm font-medium mb-2">Amenities</p>

        <div className="flex flex-col gap-2">
          {["wifi", "food", "ac", "laundry", "parking"].map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.amenities?.includes(item)}
                onChange={() => {
                  setFilters((prev: any) => {
                    const exists = prev.amenities.includes(item);

                    return {
                      ...prev,
                      amenities: exists
                        ? prev.amenities.filter((a: string) => a !== item)
                        : [...prev.amenities, item],
                    };
                  });
                }}
                className="accent-black"
              />
              {item}
            </label>
          ))}
        </div>
      </div> */}

      {/* Reset */}
      <button
        onClick={() =>
          setFilters({
            minPrice: 0,
            maxPrice: 50000,
            gender: "all",
            amenities: [],
          })
        }
        className="w-full bg-gray-100 py-2 rounded">
        Reset
      </button>
    </div>
  );
}
