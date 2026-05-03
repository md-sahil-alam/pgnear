"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import ImageUpload from "@/components/ImageUpload";

interface Listing {
  _id: string;
  title: string;
  price: number;
  gender: string;
  amenities: string[];
  contactPhone: string;
  contactWhatsApp: string;
  address: string;
  distanceFromUni: number;
  images: string[];
}

export default function EditListingForm({ listing }: { listing: Listing }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: listing.title,
    price: listing.price.toString(),
    gender: listing.gender,
    amenities: listing.amenities.join(","),
    contactPhone: listing.contactPhone,
    contactWhatsApp: listing.contactWhatsApp,
    address: listing.address,
    distanceFromUni: listing.distanceFromUni.toString(),
  });

  const [images, setImages] = useState<string[]>(listing.images || []);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/listings/${listing._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          distanceFromUni: Number(form.distanceFromUni),
          amenities: form.amenities
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean),
          images,
        }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/listings");
      } else {
        alert("Error: " + (data.error || "Failed to update listing"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Edit Listing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input
            name="title"
            placeholder="e.g., Cozy Room Near University"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Price (₹/month)
          </label>
          <Input
            name="price"
            type="number"
            placeholder="5000"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Gender Preference
          </label>
          <Select name="gender" value={form.gender} onChange={handleChange}>
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium mb-2">Amenities</label>
          <Input
            name="amenities"
            placeholder="wifi,food,laundry,ac,parking (comma separated)"
            value={form.amenities}
            onChange={handleChange}
          />
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <Input
            name="contactPhone"
            placeholder="+91 9876543210"
            value={form.contactPhone}
            onChange={handleChange}
          />
        </div>

        {/* WhatsApp */}
        <div>
          <label className="block text-sm font-medium mb-2">
            WhatsApp Number
          </label>
          <Input
            name="contactWhatsApp"
            placeholder="+91 9876543210"
            value={form.contactWhatsApp}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <Input
            name="address"
            placeholder="Full address with area, city"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        {/* Distance */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Distance from University (meters)
          </label>
          <Input
            name="distanceFromUni"
            type="number"
            placeholder="500"
            value={form.distanceFromUni}
            onChange={handleChange}
          />
        </div>

        {/* Images */}
        <ImageUpload onImagesChange={setImages} initialImages={images} />

        {/* Submit */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1"
          >
            {loading ? "Updating..." : "Update Listing"}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
