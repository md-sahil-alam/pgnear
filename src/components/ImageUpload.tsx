"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface ImageUploadProps {
  onImagesChange: (urls: string[]) => void;
  initialImages?: string[];
}

export default function ImageUpload({
  onImagesChange,
  initialImages = [],
}: ImageUploadProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    setError(null);
    const newImageUrls: string[] = [];

    try {
      for (let i = 0; i < Math.min(files.length, 15 - images.length); i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Upload failed");
        }

        const data = await response.json();
        if (data.success && data.url) {
          newImageUrls.push(data.url);
        }
      }

      if (newImageUrls.length === 0) {
        setError("Failed to upload images");
        return;
      }

      const updatedImages = [...images, ...newImageUrls];
      setImages(updatedImages);
      onImagesChange(updatedImages);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2">
        Images (Optional)
      </label>

      {/* Upload Area */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer",
          "hover:border-blue-500 hover:bg-blue-50 transition",
          images.length >= 15 ? "opacity-50 cursor-not-allowed" : "",
        )}
        onClick={() => images.length < 15 && fileInputRef.current?.click()}>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading || images.length >= 15}
          className="hidden"
        />

        {uploading ? (
          <div>
            <p className="text-gray-600">⏳ Uploading...</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 font-medium">
              📷 Click to upload images
            </p>
            <p className="text-sm text-gray-500">
              {images.length}/15 images ({15 - images.length} remaining)
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          ❌ {error}
        </div>
      )}

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">
            Preview ({images.length} images)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 md:h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-sm font-bold">
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
