"use client";

export default function FilterPanel({
  filters,
  setFilters,
}: {
  filters: any;
  setFilters: any;
}) {
  return (
    <div className="bg-white rounded-xl p-5 h-fit lg:sticky lg:top-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Price */}
      <div className="mb-5">
        <p className="text-sm font-medium mb-2">Price Range</p>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters((prev: any) => ({
                ...prev,
                minPrice: e.target.value,
              }))
            }
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((prev: any) => ({
                ...prev,
                maxPrice: e.target.value,
              }))
            }
            className="w-full border px-3 py-2 rounded"
          />
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
            minPrice: "",
            maxPrice: "",
            gender: "all",
            amenity: "",
          })
        }
        className="w-full bg-gray-100 py-2 rounded">
        Reset
      </button>
    </div>
  );
}
