

"use client";

import NavbarWrapper from "@/components/NavbarWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import { PWAProvider } from "@/context/PWAContext";
import InstallPrompt from "@/components/InstallPrompt";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PWAProvider>
      <NavbarWrapper />

      {children}

      <FooterWrapper />
      <InstallPrompt />
    </PWAProvider>
  );
}