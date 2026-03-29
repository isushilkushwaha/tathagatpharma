

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "#Home" },
    { name: "Doctor", href: "#Doctor" },
    { name: "Services", href: "#Services" },
    { name: "Appointment", href: "#appointment" },
    { name: "Blogs", href: "#blog" },
  ];

  // 🔥 Detect logged-in user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  // 🔥 Scroll active link
  useEffect(() => {
    const handleScroll = () => {
      navLinks.forEach((link) => {
        const section = document.querySelector(link.href);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActive(link.name);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Smart Admin Navigation
  const handleAdminClick = () => {
    if (user) {
      router.push("/admin/dashboard"); // logged in
    } else {
      router.push("/login"); // not logged in
    }
  };

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b shadow-sm">
      
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        {/* Animated Text Logo */}
<Link href="/" className="group flex items-center">
  <span className="text-xl font-bold tracking-tight">
    
    {/* Tathagat */}
    <span className="text-green-600 transition-all duration-300 group-hover:text-green-500 group-hover:-translate-y-0.5 inline-block">
      Tathagat
    </span>

    {/* Pharma */}
    <span className="text-blue-600 ml-1 transition-all duration-300 group-hover:text-blue-500 group-hover:translate-y-0.5 inline-block">
      Pharma
    </span>

  </span>
</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          {navLinks.map((link) => {
            const isActive = active === link.name;

            return (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`pb-1 transition ${
                    isActive
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {link.name}
                </Link>

                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-green-600 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </div>
            );
          })}

          {/* ✅ Smart Admin Button */}
          <button
            onClick={handleAdminClick}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Admin
          </button>
        </div>

        {/* Mobile Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col items-center gap-4 pb-4">

          {navLinks.map((link) => {
            const isActive = active === link.name;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`${
                  isActive
                    ? "text-green-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* ✅ Mobile Admin Button */}
          <button
            onClick={() => {
              setOpen(false);
              if (user) {
                router.push("/admin/dashboard");
              } else {
                router.push("/login");
              }
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Admin
          </button>
        </div>
      )}
    </nav>
  );
}