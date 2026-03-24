"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function RatingForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (!name || !message || rating === 0) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    await addDoc(collection(db, "ratings"), {
      name,
      message,
      rating,
      createdAt: serverTimestamp(),
      status: "pending",
    });

    setName("");
    setMessage("");
    setRating(0);
    setLoading(false);

    alert("Review submitted!");
  };

  return (
    <div className="flex justify-center px-4 py-4">
      {/* Wide + Compact Container */}
      <div className="w-full max-w-4xl p-3 space-y-3 border border-gray-200 rounded-lg">

        <h2 className="text-base font-semibold text-center">
          Give Your Feedback
        </h2>

        {/* ⭐ Star Rating */}
        <div className="flex justify-center gap-1 text-2xl">
  {[1, 2, 3, 4, 5].map((star) => {
    const isSelected = star <= rating;

    return (
      <span
        key={star}
        className={`cursor-pointer transition ${
          isSelected ? "text-yellow-500 scale-110" : "text-black"
        }`}
        onClick={() => setRating(star)}
      >
        ★
      </span>
    );
  })}
</div>

        {/* Inputs Row */}
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="Your Name"
            className="flex-1 px-2 py-1 text-sm outline-none border-b border-gray-200 focus:border-gray-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Write review..."
            className="flex-1 px-2 py-1 text-sm outline-none border-b border-gray-200 focus:border-gray-400 resize-none"
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={submitReview}
          className="w-full text-sm py-1 border border-gray-300 rounded-md hover:border-gray-500 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}