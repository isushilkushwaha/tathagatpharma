"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// DRY: Define images in one place
const SLIDE_IMAGES = [
  { src: "/h7.jpg", alt: "Modern Clinic Interior" },
  { src: "/h2.jpg", alt: "Drx. Buddhraj Kushwaha" },
  { src: "/h3.jpg", alt: "Tathagat Medical Team" },
  { src: "/h4.jpg", alt: "Tathagat Medical Team" },
  { src: "/h5.jpg", alt: "Tathagat Medical Team" },
  { src: "/h6.jpg", alt: "Tathagat Medical Team" },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-[2.5rem] overflow-hidden border-8 shadow-2xl aspect-4/3">
      {SLIDE_IMAGES.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
            priority={index === 0}
            quality={75}
          />
          {/* Subtle Overlay for text readability if needed */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDE_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === currentIndex ? "w-5 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}