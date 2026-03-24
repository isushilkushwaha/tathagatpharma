import { Facebook, Instagram, Github, Youtube } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-100 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center gap-6">

        {/* 🏥 Medical Description */}
        <div className="text-center max-w-xl">
          <h2 className="text-lg font-semibold text-gray-800">
            Tathagat Pharma & Medical Clinic
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Providing trusted healthcare services, quality medicines, and expert medical guidance. 
            Your health is our priority — we are committed to delivering safe, reliable, and 
            affordable care for everyone.
          </p>
        </div>

        {/* 📱 Social Icons */}
        <div className="flex gap-6 text-gray-500">
          <a href="#"><Facebook size={20} className="hover:text-blue-600 transition" /></a>
          <a href="#"><Instagram size={20} className="hover:text-pink-500 transition" /></a>
          <a href="#"><FaXTwitter size={18} className="hover:text-black transition" /></a>
          <a href="#"><Github size={20} className="hover:text-gray-800 transition" /></a>
          <a href="#"><Youtube size={20} className="hover:text-red-600 transition" /></a>
        </div>

        {/* 💊 Extra Medical Note */}
        <p className="text-xs text-gray-500 text-center max-w-md">
          ⚠️ Information provided on this platform is for general awareness only. 
          Please consult a qualified doctor for proper diagnosis and treatment.
        </p>

        {/* © Copyright */}
        <p className="text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Tathagat Pharma. All rights reserved.
        </p>

      </div>
    </footer>
  );
}