"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PWAContext = createContext<any>(null);

export function PWAProvider({ children }: any) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      

      e.preventDefault(); // REQUIRED
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () =>
      window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return (
    <PWAContext.Provider value={deferredPrompt}>
      {children}
    </PWAContext.Provider>
  );
}

// 🔥 Custom hook
export function usePWA() {
  return useContext(PWAContext);
}