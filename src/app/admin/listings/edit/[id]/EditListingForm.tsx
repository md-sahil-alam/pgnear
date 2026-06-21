"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import ImageUpload from "@/components/ImageUpload";
import { normalizeGenderValue } from "@/lib/gender";

const COLLEGES = [
  { value: "presidency-university", label: "Presidency University" },
  { value: "reva-university", label: "REVA University" },
  { value: "nmit", label: "NMIT" },
  { value: "cmr-university", label: "CMR University" },
];

interface Listing {
  _id: string;
  title: string;
  description?: string;

  oneSharingprice?: number;
  twoSharingprice?: number;
  threeSharingprice?: number;

  gender?: string;
  amenities?: string[];

  contactPhone?: string;
  contactWhatsApp?: string;

  address?: string;
  distanceFromUni?: number;

  nearCollege?: {
    college: string;
    distance: number;
  }[];

  images?: string[];
}

type NearCollegeItem = {
  college: string;
  distance: string;
};

export default function EditListingForm({ listing }: { listing: Listing }) {
  const router = useRouter();

  const initialNearCollege: NearCollegeItem[] = listing.nearCollege?.length
    ? listing.nearCollege.map((item) => ({
        college: item.college,
        distance: item.distance?.toString() || "",
      }))
    : listing.distanceFromUni
      ? [
          {
            college: "presidency-university",
            distance: listing.distanceFromUni.toString(),
          },
        ]
      : [];

  const [form, setForm] = useState({
    title: listing.title || "",
    description: listing.description || "",
    oneSharingprice: listing.oneSharingprice?.toString() || "",
    twoSharingprice: listing.twoSharingprice?.toString() || "",
    threeSharingprice: listing.threeSharingprice?.toString() || "",
    gender: normalizeGenderValue(listing.gender || "all"),
    amenities: listing.amenities?.join(", ") || "",
    contactPhone: listing.contactPhone || "",
    contactWhatsApp: listing.contactWhatsApp || "",
    address: listing.address || "",
    distanceFromUni:
      listing.distanceFromUni?.toString() ||
      listing.nearCollege?.[0]?.distance?.toString() ||
      "",
  });

  const [images, setImages] = useState<string[]>(listing.images || []);
  const [loading, setLoading] = useState(false);
  const [nearCollege, setNearCollege] =
    useState<NearCollegeItem[]>(initialNearCollege);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const toggleCollege = (collegeValue: string) => {
    setNearCollege((prev) => {
      const exists = prev.some((item) => item.college === collegeValue);

      if (exists) {
        return prev.filter((item) => item.college !== collegeValue);
      }

      return [...prev, { college: collegeValue, distance: "" }];
    });
  };

  const updateCollegeDistance = (collegeValue: string, distance: string) => {
    setNearCollege((prev) =>
      prev.map((item) =>
        item.college === collegeValue ? { ...item, distance } : item,
      ),
    );
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const cleanedNearCollege = nearCollege
        .filter((item) => item.college && item.distance !== "")
        .map((item) => ({
          college: item.college,
          distance: Number(item.distance) || 0,
        }));

      const primaryDistance =
        Number(form.distanceFromUni) || cleanedNearCollege[0]?.distance || null;

      const res = await fetch(`/api/listings/${listing._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,

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

          distanceFromUni: primaryDistance,
          nearCollege: cleanedNearCollege,

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
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input
            name="title"
            placeholder="Enter listing title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            placeholder="Describe the PG, food, security, room type, and highlights"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium mb-2">
            Gender Preference
          </label>
          <Select name="gender" value={form.gender} onChange={handleChange}>
            <option value="all">All</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            Nearby Colleges
          </label>

          <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            {COLLEGES.map((college) => {
              const checked = nearCollege.some(
                (item) => item.college === college.value,
              );

              const selectedItem = nearCollege.find(
                (item) => item.college === college.value,
              );

              return (
                <div
                  key={college.value}
                  className="rounded-md border border-gray-200 bg-white p-3">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCollege(college.value)}
                      className="h-4 w-4"
                    />
                    {college.label}
                  </label>

                  {checked && (
                    <div className="mt-3">
                      <label className="block text-xs font-medium mb-1 text-gray-600">
                        Distance from {college.label} (meters)
                      </label>
                      <Input
                        type="number"
                        placeholder="550"
                        value={selectedItem?.distance || ""}
                        onChange={(e) =>
                          updateCollegeDistance(college.value, e.target.value)
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Amenities</label>
          <Input
            name="amenities"
            placeholder="wifi, food, laundry, ac"
            value={form.amenities}
            onChange={handleChange}
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <Input
            name="address"
            placeholder="Full address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Primary Distance From University (meters)
          </label>
          <Input
            name="distanceFromUni"
            type="number"
            placeholder="500"
            value={form.distanceFromUni}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">Images</label>
          <ImageUpload onImagesChange={setImages} initialImages={images} />
        </div>

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
