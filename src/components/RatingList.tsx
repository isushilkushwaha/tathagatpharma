"use client";

import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function RatingSection() {
  const [ratings, setRatings] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      const q = query(
        collection(db, "ratings"),
        where("status", "==", "approved")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRatings(data);
    };

    fetchRatings();
  }, []);

  // ⭐ Calculate Average Rating
  const totalRatings = ratings.length;

  const avgRating =
    totalRatings > 0
      ? (
          ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
        ).toFixed(1)
      : 0;

  const roundedAvg = Math.round(Number(avgRating));

  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold">
            Patient Reviews
          </h2>

          <p className="mt-2 text-sm">
            See what our patients say about our service and treatment.
          </p>

          {/* ⭐ Average Rating */}
          <div className="mt-4 flex items-center gap-3">
            <div className="text-lg">
              <span className="text-yellow-500">
                {"★".repeat(roundedAvg)}
              </span>
              <span className="text-gray-300">
                {"★".repeat(5 - roundedAvg)}
              </span>
            </div>

            <p className="text-sm">
              {avgRating} / 5 ({totalRatings} reviews)
            </p>
          </div>
        </div>

        {/* Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="mt-10 flex gap-6 overflow-x-auto pb-4"
        >
          {ratings.length === 0 ? (
            <p>No reviews available</p>
          ) : (
            ratings.map((r) => (
              <div
                key={r.id}
                className="min-w-75 h-65 border rounded-lg p-5 flex flex-col justify-between hover:shadow-md transition"
              >

                {/* ⭐ User Rating */}
                <div className="text-lg">
                  <span className="text-yellow-500">
                    {"★".repeat(r.rating)}
                  </span>
                  <span className="text-gray-300">
                    {"★".repeat(5 - r.rating)}
                  </span>
                </div>

                {/* 💬 Message */}
                <p className="text-sm line-clamp-4">
                  {r.message}
                </p>

                {/* 👤 Name */}
                <div className="text-sm">
                  <p className="font-semibold">
                    — {r.name}
                  </p>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}