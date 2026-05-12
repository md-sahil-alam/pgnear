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

  oneSharingprice?: number;
  twoSharingprice?: number;
  threeSharingprice?: number;

  gender?: string;
  amenities?: string[];

  contactPhone?: string;
  contactWhatsApp?: string;

  address?: string;
  distanceFromUni?: number;

  images?: string[];
}

export default function EditListingForm({ listing }: { listing: Listing }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: listing.title || "",
    oneSharingprice: listing.oneSharingprice?.toString() || "",
    twoSharingprice: listing.twoSharingprice?.toString() || "",
    threeSharingprice: listing.threeSharingprice?.toString() || "",

    gender: listing.gender || "any",

    amenities: listing.amenities?.join(", ") || "",

    contactPhone: listing.contactPhone || "",
    contactWhatsApp: listing.contactWhatsApp || "",

    address: listing.address || "",

    distanceFromUni: listing.distanceFromUni?.toString() || "",
  });

  const [images, setImages] = useState<string[]>(listing.images || []);

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/listings/${listing._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: form.title,

          oneSharingprice: form.oneSharingprice
            ? Number(form.oneSharingprice)
            : null,

          twoSharingprice: form.twoSharingprice
            ? Number(form.twoSharingprice)
            : null,

          threeSharingprice: form.threeSharingprice
            ? Number(form.threeSharingprice)
            : null,

          gender: form.gender,

          amenities: form.amenities
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean),

          contactPhone: form.contactPhone,
          contactWhatsApp: form.contactWhatsApp,

          address: form.address,

          distanceFromUni: form.distanceFromUni
            ? Number(form.distanceFromUni)
            : null,

          images,
        }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/listings");
        router.refresh();
      } else {
        alert(data.error || "Failed to update listing");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
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
            placeholder="Enter listing title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        {/* Description */}

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              1 Sharing Price
            </label>

            <Input
              name="oneSharingprice"
              type="number"
              placeholder="₹5000"
              value={form.oneSharingprice}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              2 Sharing Price
            </label>

            <Input
              name="twoSharingprice"
              type="number"
              placeholder="₹4000"
              value={form.twoSharingprice}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              3 Sharing Price
            </label>

            <Input
              name="threeSharingprice"
              type="number"
              placeholder="₹3000"
              value={form.threeSharingprice}
              onChange={handleChange}
            />
          </div>
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
            placeholder="wifi, food, laundry, ac"
            value={form.amenities}
            onChange={handleChange}
          />
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>

            <Input
              name="contactPhone"
              placeholder="9876543210"
              value={form.contactPhone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              WhatsApp Number
            </label>

            <Input
              name="contactWhatsApp"
              placeholder="9876543210"
              value={form.contactWhatsApp}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-2">Address</label>

          <Input
            name="address"
            placeholder="Full address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        {/* Distance */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Distance From University (meters)
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
        <div>
          <label className="block text-sm font-medium mb-3">Images</label>

          <ImageUpload onImagesChange={setImages} initialImages={images} />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <Button onClick={handleSubmit} disabled={loading} className="flex-1">
            {loading ? "Updating..." : "Update Listing"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
