"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import ImageUpload from "@/components/ImageUpload";

export default function NewListingPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    ownerName: "",
    title: "",
    oneSharingprice: "",
    twoSharingprice: "",
    threeSharingprice: "",
    gender: "all",
    amenities: "",
    contactPhone: "",
    contactWhatsApp: "",
    address: "",
    distanceFromUni: "",
  });

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          oneSharingprice: Number(form.oneSharingprice),
          twoSharingprice: Number(form.twoSharingprice),
          threeSharingprice: Number(form.threeSharingprice),
          distanceFromUni: Number(form.distanceFromUni),
          amenities: form.amenities
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean),
          images,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/listings");
      } else {
        alert("Error: " + (data.error || "Failed to create listing"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Listing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Owner Name
              </label>
              <Input
                name="ownerName"
                placeholder="Name"
                value={form.ownerName}
                onChange={handleChange}
              />
            </div>

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
                One Sharing (₹/month)
              </label>
              <Input
                name="oneSharingprice"
                type="number"
                placeholder="5000"
                value={form.oneSharingprice}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Two Sharing (₹/month)
              </label>
              <Input
                name="twoSharingprice"
                type="number"
                placeholder="5000"
                value={form.twoSharingprice}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Three Sharing (₹/month)
              </label>
              <Input
                name="threeSharingprice"
                type="number"
                placeholder="5000"
                value={form.threeSharingprice}
                onChange={handleChange}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Gender Preference
              </label>
              <Select name="gender" value={form.gender} onChange={handleChange}>
                <option value="all">all</option>
                <option value="boys">boys</option>
                <option value="girls">girls</option>
              </Select>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Amenities
              </label>
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
            <ImageUpload onImagesChange={setImages} />

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1">
                {loading ? "Creating..." : "Create Listing"}
              </Button>
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="flex-1">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
