"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getPageName = () => {
    if (pathname.includes("appointments")) return "Appointments";
    if (pathname.includes("blog")) return "Blog";
    if (pathname.includes("patients")) return "Patients";
    if (pathname.includes("settings")) return "Settings";
    return "Dashboard";
  };

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* 🔝 HEADER */}
        <header className="flex h-16 items-center gap-2 border-b px-4 bg-white sticky top-0 z-50">
          <SidebarTrigger />

          {/* ✅ Dynamic Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>
                   {getPageName()}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* 📄 PAGE CONTENT */}
        <div className="p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}