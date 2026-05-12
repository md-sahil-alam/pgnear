"use client";

import { useEffect, useState, useRef } from "react";

export default function ImageGallery({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Reset animation direction
  useEffect(() => {
    const timeout = setTimeout(() => setDirection(null), 300);
    return () => clearTimeout(timeout);
  }, [current]);

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-200 h-96 flex items-center justify-center">
        No Image Available
      </div>
    );
  }

  const next = () => {
    setDirection("left");
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setDirection("right");
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  //  Keyboard navigation
  useEffect(() => {
    if (!fullscreen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setFullscreen(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [fullscreen]);

  //  Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) next();
    if (diff < -50) prev();
  };

  return (
    <>
      {/* Main Image */}
      <div className="relative">
        <img
          src={images[current]}
          className="w-full h-96 object-cover cursor-pointer transition duration-300"
          onClick={() => setFullscreen(true)}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded">
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded">
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Preview */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto px-3 py-2">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => {
                if (i > current) setDirection("left");
                else if (i < current) setDirection("right");
                setCurrent(i);
              }}
              className={`h-20 w-28 object-cover cursor-pointer rounded border transition ${
                i === current
                  ? "border-blue-500 scale-105"
                  : "border-gray-300 opacity-70 hover:opacity-100"
              }`}
            />
          ))}
        </div>
      )}

      {/* Fullscreen */}
      {fullscreen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}>
          {/* Close */}
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-4 right-6 text-white text-2xl z-50">
            ✕
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={prev}
              className="absolute left-6 text-white text-4xl z-50 ">
              ‹
            </button>
          )}

          {/* Animated Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              key={current}
              src={images[current]}
              className={`
                max-h-[90%] max-w-[90%] object-contain
                transition-all duration-300 ease-in-out
                ${
                  direction === "left"
                    ? "animate-slide-left"
                    : direction === "right"
                      ? "animate-slide-right"
                      : ""
                }
              `}
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={next}
              className="absolute right-6 text-white text-4xl z-50">
              ›
            </button>
          )}

          {/* Indicator */}
          <div className="absolute bottom-6 text-white text-sm">
            {current + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
