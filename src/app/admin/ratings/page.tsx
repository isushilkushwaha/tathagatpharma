
"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function AdminRatingsPage() {
  const [ratings, setRatings] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");

  const fetchRatings = async () => {
    const snapshot = await getDocs(collection(db, "ratings"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // ⭐ Sort by rating (highest first)
    const sorted = data.sort((a: any, b: any) => b.rating - a.rating);
    setRatings(sorted);
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const approveRating = async (id: string) => {
    setLoadingId(id);
    await updateDoc(doc(db, "ratings", id), {
      status: "approved",
    });
    setLoadingId(null);
    fetchRatings();
  };

  const deleteRating = async (id: string) => {
    const confirmDelete = confirm("Delete this rating?");
    if (!confirmDelete) return;

    setLoadingId(id);
    await deleteDoc(doc(db, "ratings", id));
    setLoadingId(null);

    setRatings((prev) => prev.filter((r) => r.id !== id));
  };

  const filteredRatings = ratings.filter((r) => {
    if (filter === "approved") return r.status === "approved";
    if (filter === "pending") return r.status !== "approved";
    return true;
  });

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      
      {/* 🔥 Header */}
      <div className="p-4 border-b bg-white sticky top-0 z-20">
        <h1 className="text-lg sm:text-xl font-bold">Manage Ratings</h1>

        {/* Filter Buttons */}
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {["all", "approved", "pending"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-full border whitespace-nowrap text-sm ${
                filter === f
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 Scrollable List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {filteredRatings.length === 0 && (
          <p className="text-center text-gray-500">No ratings found</p>
        )}

        {filteredRatings.map((r) => (
          <div
            key={r.id}
            className="bg-white p-4 rounded-xl shadow-sm border flex flex-col gap-3"
          >
            {/* Top Section */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-base">{r.name}</h3>
                <p className="text-yellow-500 text-sm">
                  {"★".repeat(r.rating)}
                </p>
              </div>

              <span className="text-xs px-2 py-1 rounded bg-gray-100">
                {r.status}
              </span>
            </div>

            {/* Message */}
            <p className="text-sm text-gray-700">{r.message}</p>

            {/* Buttons */}
            <div className="flex gap-2 flex-wrap">
              {r.status !== "approved" && (
                <button
                  onClick={() => approveRating(r.id)}
                  className="flex-1 min-w-25px-3 py-2 rounded-lg bg-green-600 text-white text-sm"
                  disabled={loadingId === r.id}
                >
                  {loadingId === r.id ? "..." : "Approve"}
                </button>
              )}

              <button
                onClick={() => deleteRating(r.id)}
                className="flex-1 min-w-25 px-3 py-2 rounded-lg bg-red-500 text-white text-sm"
                disabled={loadingId === r.id}
              >
                {loadingId === r.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}