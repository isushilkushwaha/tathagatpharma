// "use client"

// import * as React from "react"

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
//   SidebarRail,
// } from "@/components/ui/sidebar"
// import { GalleryVerticalEndIcon } from "lucide-react"

// // This is sample data.
// const data = {
//   navMain: [
//     {
//       title: "Getting Started",
//       url: "#",
//       items: [
//         {
//           title: "Installation",
//           url: "#",
//         },
//         {
//           title: "Project Structure",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Build Your Application",
//       url: "#",
//       items: [
//         {
//           title: "Routing",
//           url: "#",
//         },
//         {
//           title: "Data Fetching",
//           url: "#",
//           isActive: true,
//         },
//         {
//           title: "Rendering",
//           url: "#",
//         },
//         {
//           title: "Caching",
//           url: "#",
//         },
//         {
//           title: "Styling",
//           url: "#",
//         },
//         {
//           title: "Optimizing",
//           url: "#",
//         },
//         {
//           title: "Configuring",
//           url: "#",
//         },
//         {
//           title: "Testing",
//           url: "#",
//         },
//         {
//           title: "Authentication",
//           url: "#",
//         },
//         {
//           title: "Deploying",
//           url: "#",
//         },
//         {
//           title: "Upgrading",
//           url: "#",
//         },
//         {
//           title: "Examples",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "API Reference",
//       url: "#",
//       items: [
//         {
//           title: "Components",
//           url: "#",
//         },
//         {
//           title: "File Conventions",
//           url: "#",
//         },
//         {
//           title: "Functions",
//           url: "#",
//         },
//         {
//           title: "next.config.js Options",
//           url: "#",
//         },
//         {
//           title: "CLI",
//           url: "#",
//         },
//         {
//           title: "Edge Runtime",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Architecture",
//       url: "#",
//       items: [
//         {
//           title: "Accessibility",
//           url: "#",
//         },
//         {
//           title: "Fast Refresh",
//           url: "#",
//         },
//         {
//           title: "Next.js Compiler",
//           url: "#",
//         },
//         {
//           title: "Supported Browsers",
//           url: "#",
//         },
//         {
//           title: "Turbopack",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Community",
//       url: "#",
//       items: [
//         {
//           title: "Contribution Guide",
//           url: "#",
//         },
//       ],
//     },
//   ],
// }

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar {...props}>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" asChild>
//               <a href="#">
//                 <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
//                   <GalleryVerticalEndIcon className="size-4" />
//                 </div>
//                 <div className="flex flex-col gap-0.5 leading-none">
//                   <span className="font-medium">Documentation</span>
//                   <span className="">v1.0.0</span>
//                 </div>
//               </a>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarMenu>
//             {data.navMain.map((item) => (
//               <SidebarMenuItem key={item.title}>
//                 <SidebarMenuButton asChild>
//                   <a href={item.url} className="font-medium">
//                     {item.title}
//                   </a>
//                 </SidebarMenuButton>
//                 {item.items?.length ? (
//                   <SidebarMenuSub>
//                     {item.items.map((item) => (
//                       <SidebarMenuSubItem key={item.title}>
//                         <SidebarMenuSubButton asChild isActive={item.isActive}>
//                           <a href={item.url}>{item.title}</a>
//                         </SidebarMenuSubButton>
//                       </SidebarMenuSubItem>
//                     ))}
//                   </SidebarMenuSub>
//                 ) : null}
//               </SidebarMenuItem>
//             ))}
//           </SidebarMenu>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarRail />
//     </Sidebar>
//   )
// }


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
  Users,
  Settings,
  LogOut,        // ✅ added
} from "lucide-react"

import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"

// ✅ Simple nav items
const navItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Appointments", url: "/admin/appointments", icon: Calendar },
  { title: "Blog", url: "/admin/blog", icon: FileText },
  { title: "Ratings", url: "/admin/ratings", icon: Users },
  { title: "Settings", url: "/admin/settings", icon: Settings },
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