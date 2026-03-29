"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePWA } from "@/context/PWAContext"; // ✅ use global state

export default function InstallPrompt() {
  const deferredPrompt = usePWA(); // ✅ no props now

  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!deferredPrompt) return;

    const dismissed = localStorage.getItem("install-dismissed");
    if (dismissed) return;

    let timer: any;

    const handleScroll = () => {
      if (window.scrollY > 200) {
        timer = setTimeout(() => {
          setShow(true);
          setTimeout(() => setVisible(true), 50);
        }, 1000);

        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [deferredPrompt]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      console.log("✅ Installed");
    }

    closePopup();
  };

  const closePopup = () => {
    setVisible(false);

    setTimeout(() => {
      setShow(false);
      localStorage.setItem("install-dismissed", "true");
    }, 300);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 flex justify-center px-3 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl p-4 border">
        
        {/* Drag Bar */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3"></div>

        <div className="flex items-center gap-3">
          <img
            src="/logo1-192x192.png"
            alt="app"
            className="w-12 h-12 rounded-xl"
          />

          <div className="flex-1">
            <p className="font-semibold text-gray-900">
              Tathagat Pharma
            </p>
            <p className="text-sm text-gray-500">
              Install app for faster access 🚀
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            onClick={handleInstall}
            className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-full"
          >
            Install
          </Button>

          <Button
            variant="outline"
            onClick={closePopup}
            className="flex-1 rounded-full"
          >
            Not Now
          </Button>
        </div>
      </div>
    </div>
  );
}