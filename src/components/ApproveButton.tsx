"use client";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // ✅ ADD THIS
  DialogFooter,
} from "@/components/ui/dialog";

export default function ApproveButton({
  item,
  onSuccess,
}: {
  item: any;
  onSuccess?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const isApproved = item.status === "approved";
  const isCompleted = item.status === "completed";

  const handleApprove = async () => {
    if (!date || !time) {
      alert("Please select date & time");
      return;
    }

    try {
      setLoading(true);

      await updateDoc(doc(db, "appointments", item.id), {
        status: "approved",
        date,
        time,
      });

      await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify({
          type: "approved",
          email: item.email,
          name: item.name,
          doctor: "Raj Kushwaha",
          date,
          time,
        }),
      });

      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Approve failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BUTTON */}
      <button
        disabled={isApproved || isCompleted}
        onClick={() => setOpen(true)}
        className={`px-2 py-1 text-xs rounded ${
          isApproved || isCompleted
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {isApproved ? "Approved" : "Approve"}
      </button>

      {/* POPUP */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95%] sm:max-w-md rounded-xl">

          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">
              Set Appointment Schedule
            </DialogTitle>

            {/* ✅ THIS FIXES WARNING */}
            <DialogDescription>
              Select date and time to confirm this appointment.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">

            {/* DATE */}
            <div>
              <label className="text-sm font-medium">Select Date</label>
              <input
                type="date"
                className="w-full border rounded px-2 py-2 mt-1"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* TIME */}
            <div>
              <label className="text-sm font-medium">Select Time</label>
              <input
                type="time"
                className="w-full border rounded px-2 py-2 mt-1"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="mt-4 flex gap-2">

            <button
              onClick={() => setOpen(false)}
              className="flex-1 px-3 py-2 text-sm bg-gray-200 rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleApprove}
              disabled={loading}
              className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded"
            >
              {loading ? "Sending..." : "Confirm & Approve"}
            </button>

          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}