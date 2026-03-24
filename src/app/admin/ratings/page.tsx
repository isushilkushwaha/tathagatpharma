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

  const fetchRatings = async () => {
    const snapshot = await getDocs(collection(db, "ratings"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRatings(data);
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  // ✅ Approve
  const approveRating = async (id: string) => {
    setLoadingId(id);
    await updateDoc(doc(db, "ratings", id), {
      status: "approved",
    });
    setLoadingId(null);
    fetchRatings();
  };

  // ✅ Delete (with confirmation)
  const deleteRating = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this rating?");
    if (!confirmDelete) return;

    setLoadingId(id);
    await deleteDoc(doc(db, "ratings", id));
    setLoadingId(null);

    // 🔥 Instant UI update (no refetch delay)
    setRatings((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Manage Ratings</h1>

      {ratings.length === 0 && <p>No ratings found</p>}

      {ratings.map((r) => (
        <div
          key={r.id}
          className="border p-4 rounded flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{r.name}</h3>

            {/* ⭐ Stars */}
            <p>{"★".repeat(r.rating)}</p>

            <p>{r.message}</p>

            <p className="text-xs">{r.status}</p>
          </div>

          <div className="flex gap-2">
            {/* Approve */}
            {r.status !== "approved" && (
              <button
                onClick={() => approveRating(r.id)}
                className="px-3 py-1 border rounded"
                disabled={loadingId === r.id}
              >
                {loadingId === r.id ? "..." : "Approve"}
              </button>
            )}

            {/* Delete */}
            <button
              onClick={() => deleteRating(r.id)}
              className="px-3 py-1 border rounded"
              disabled={loadingId === r.id}
            >
              {loadingId === r.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}