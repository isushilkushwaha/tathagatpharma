"use client";

import { useEffect, useState } from "react";

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      console.log("🔥 beforeinstallprompt fired");

      e.preventDefault(); // REQUIRED
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);


    return () =>
      window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  console.log("🔥 beforeinstallprompt fired");

  return deferredPrompt;
}