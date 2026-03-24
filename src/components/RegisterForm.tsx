"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registered ✅ Now Login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6 border rounded-xl shadow w-full">
      <h2 className="text-xl font-bold text-green-600 mb-4 text-center">
        Admin Register
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-3 mb-3 rounded"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 mb-4 rounded"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="w-full bg-blue-600 text-white p-3 rounded"
      >
        Register
      </button>
    </div>
  );
}