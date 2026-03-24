"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

/* 🔁 Reusable Input (DRY) */
const Input = ({ type = "text", placeholder, value, onChange }: any) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-3 py-2.5 text-sm bg-white/60 border border-transparent 
    rounded-md outline-none transition-all duration-200
    focus:border-green-500 focus:bg-white focus:shadow-sm
    placeholder:text-slate-400"
  />
);

export default function AppointmentPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    message: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* Handle Change */
  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* Validation */
  const validate = () => {
    const err: any = {};

    if (form.name.trim().length < 3) err.name = "Enter valid name";
    if (!/^[0-9]{10}$/.test(form.phone)) err.phone = "Enter valid phone";
    if (!form.date) err.date = "Select date";

    return err;
  };

  /* Submit */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;

    setLoading(true);

    try {
      await addDoc(collection(db, "appointments"), {
        ...form,
        status: "pending",
        createdAt: Timestamp.now(),
      });

      /* 📲 WhatsApp Message */
      const whatsappMessage = `Hello, my name is ${form.name}.
I want to book an appointment on ${form.date}.
Phone: ${form.phone}
Message: ${form.message || "N/A"}`;

      const whatsappNumber = "918303806952"; // 🔴 replace with your number

      // window.open(
      //   `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      //     whatsappMessage
      //   )}`,
      //   "_blank"
      // );

      setSuccess(true);
      setForm({ name: "", phone: "", date: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
      
      <div className="w-full max-w-sm">
        
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            Book Appointment
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Simple & quick booking
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Name */}
          <div>
            <Input
              placeholder="Full Name"
              value={form.name}
              onChange={(e: any) => handleChange("name", e.target.value)}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e: any) => handleChange("phone", e.target.value)}
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <Input
              type="date"
              value={form.date}
              onChange={(e: any) => handleChange("date", e.target.value)}
            />
            {errors.date && (
              <p className="text-red-400 text-xs mt-1">{errors.date}</p>
            )}
          </div>

          {/* Message */}
          <textarea
            placeholder="Message (optional)"
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-white/60 border border-transparent 
            rounded-md outline-none transition-all duration-200
            focus:border-green-500 focus:bg-white focus:shadow-sm
            placeholder:text-slate-400"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 
            text-white text-sm py-2.5 rounded-md transition-all duration-200"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>

      {/* ✅ Animated Success Popup */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl p-6 w-72 text-center shadow-lg animate-scaleIn">
            
            <div className="text-3xl mb-2">✅</div>

            <h2 className="text-lg font-semibold text-slate-800">
              Appointment Booked
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              We will contact you soon
            </p>

            <button
              onClick={() => setSuccess(false)}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-md text-sm hover:bg-green-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}