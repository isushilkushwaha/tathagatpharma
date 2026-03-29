

"use client";

import { Phone, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HeroSlider from "./shared/HeroSlider";
import StatusCard from "./StatusCard";
import { usePWA } from "@/context/PWAContext"; // ✅ FIXED

export default function HeroSection() {
  const deferredPrompt = usePWA(); // ✅ GLOBAL STATE

  const handleInstall = async () => {
    if (!deferredPrompt) {
      alert("Install not available yet ❌");
      return;
    }

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      console.log("✅ App Installed");
    }
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 lg:pt-5 lg:pb-15 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="relative z-10 text-center lg:text-left space-y-6">
          
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-600 border-blue-100 px-4 py-1.5 rounded-full text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-700"
          >
            ✨ Trusted Healthcare Provider
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Tathagat Medical <br />
            <span className="text-blue-600">& Pharma Clinic</span>
          </h1>

          <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-1000">
            Complete healthcare and medicine under one roof. Experience compassionate care
            with modern medical expertise, consultation, and a fully stocked pharmacy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            
            {/* Call Button */}
            <Button
              size="lg"
              className="rounded-full bg-blue-600 hover:bg-blue-700 px-8 h-14 text-base shadow-lg shadow-blue-200 transition-all hover:scale-105"
              asChild
            >
              <a href="tel:+919936459785">
                <Phone className="mr-2 h-5 w-5" /> Call Now
              </a>
            </Button>

            {/* WhatsApp Button */}
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-slate-200 h-14 px-8 text-base bg-white hover:bg-slate-50 transition-all hover:scale-105"
              asChild
            >
              <a
                href="https://wa.me/919936459785"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="mr-2 h-5 w-5 text-green-500" /> WhatsApp
              </a>
            </Button>

            {/* 📱 Install App Button */}
            {deferredPrompt && (
              <Button
                size="lg"
                className="rounded-full bg-green-600 hover:bg-green-700 px-8 h-14 text-base shadow-lg shadow-green-200 transition-all hover:scale-105"
                onClick={handleInstall}
              >
                📱 Install App
              </Button>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <CheckCircle2 className="text-blue-500 w-4 h-4" /> 9:00 AM - 9:00 PM
            </span>
            <span className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <CheckCircle2 className="text-blue-500 w-4 h-4" /> Mon - Sat
            </span>
          </div>

        </div>

        {/* Right Content */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg">

            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-60 animate-pulse delay-700" />

            {/* Slider */}
            <HeroSlider />

            {/* Status Card */}
            <StatusCard />

          </div>
        </div>

      </div>
    </section>
  );
}