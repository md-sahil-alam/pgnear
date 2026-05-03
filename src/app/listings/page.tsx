import ListingsClient from "./ListingsClient";

export default function ListingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6">
          Available Listings
        </h1>

        <ListingsClient />
      </div>
    </div>
  );
}
