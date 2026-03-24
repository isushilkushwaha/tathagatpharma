
"use client";

import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/InputField";

export default function ReviewPage() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-6">
        Leave a Review
      </h1>

      <form className="space-y-4">
        <InputField label="Your Name" placeholder="Enter your name" />
        
        <InputField label="Rating (1-5)" type="number" />

        <div>
          <label className="text-sm font-medium">Review</label>
          <textarea
            className="w-full border rounded-lg p-2 mt-2"
            placeholder="Write your review..."
          />
        </div>

        <Button className="w-full bg-green-600">
          Submit Review
        </Button>
      </form>
    </main>
  );
}