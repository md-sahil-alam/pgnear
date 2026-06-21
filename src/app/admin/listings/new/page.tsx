"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import ImageUpload from "@/components/ImageUpload";

const COLLEGES = [
  { value: "presidency-university", label: "Presidency University" },
  { value: "reva-university", label: "REVA University" },
  { value: "nmit", label: "NMIT" },
  { value: "cmr-university", label: "CMR University" },
];

type NearCollegeItem = {
  college: string;
  distance: string;
};

export default function NewListingPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    ownerName: "",
    title: "",
    description: "",
    oneSharingprice: "",
    twoSharingprice: "",
    threeSharingprice: "",
    gender: "all",
    amenities: "",
    contactPhone: "",
    contactWhatsApp: "",
    address: "",
  });

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [nearCollege, setNearCollege] = useState<NearCollegeItem[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

      const res = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          oneSharingprice: Number(form.oneSharingprice) || 0,
          twoSharingprice: Number(form.twoSharingprice) || 0,
          threeSharingprice: Number(form.threeSharingprice) || 0,
          distanceFromUni: cleanedNearCollege[0]?.distance || 0,
          nearCollege: cleanedNearCollege,
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
        alert("Error: " + (data.error || "Failed to create listing"));
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
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

            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                name="title"
                placeholder="e.g., Cozy Room Near University"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Describe the PG, food, security, room type, and highlights"
                value={form.description}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>

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
                              updateCollegeDistance(
                                college.value,
                                e.target.value,
                              )
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

            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <Input
                name="address"
                placeholder="Full address with area, city"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <ImageUpload onImagesChange={setImages} />

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
