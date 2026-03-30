
"use client"

import * as React from "react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,   // ✅ added
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import {
  Home,
  Calendar,
  FileText,
  LogOut,
  HelpCircle  ,
  Star
} from "lucide-react"

import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"

// ✅ Simple nav items
const navItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Appointments", url: "/admin/appointments", icon: Calendar },
  { title: "Blog", url: "/admin/blog", icon: FileText },
  { title: "Ratings", url: "/admin/ratings", icon: Star },
  { title: "FAQ", url: "/admin/faqs", icon: HelpCircle },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {

  // ✅ User state
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u)
    })
    return () => unsubscribe()
  }, [])

  // ✅ Logout
  const handleLogout = async () => {
  await signOut(auth)
  router.push("/")
}

  return (
    <Sidebar {...props} collapsible="icon">
      
      {/* 🔷 Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>

              <Link href="/" className="group flex items-center gap-2">

                {/* Icon */}
                <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-white font-bold">
                  T
                </div>

                {/* Animated Text */}
                <div className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
                  <span className="text-sm font-bold tracking-tight">
                    <span className="text-green-600 transition-all duration-300 group-hover:text-green-500 group-hover:-translate-y-0.5 inline-block">
                      Tathagat
                    </span>
                    <span className="text-blue-600 ml-1 transition-all duration-300 group-hover:text-blue-500 group-hover:translate-y-0.5 inline-block">
                      Pharma
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Admin Panel
                  </span>
                </div>

              </Link>

            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* 🔷 Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* 🔻 Footer (USER + LOGOUT) */}
      <SidebarFooter>
        <SidebarMenu>

          {/* 👤 User Email */}
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium truncate">
                  {user?.email }
                </span>
                <span className="text-xs text-muted-foreground">
                  Admin
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* 🚪 Logout */}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">
                Logout
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarFooter>

      {/* Rail */}
      <SidebarRail />
    </Sidebar>
  )
}