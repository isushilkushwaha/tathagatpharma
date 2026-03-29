"use client"

import { LoginForm } from "@/components/login-form"
import Link from "next/link"
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="group flex items-center gap-2">

        

          {/* 🔷 Animated Text (auto hidden on collapse) */}
          <div className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
            
            <span className="text-sm font-bold tracking-tight">
              
              {/* Tathagat */}
              <span className="text-green-600 transition-all duration-300 group-hover:text-green-500 group-hover:-translate-y-0.5 inline-block">
                Tathagat
              </span>

              {/* Pharma */}
              <span className="text-blue-600 ml-1 transition-all duration-300 group-hover:text-blue-500 group-hover:translate-y-0.5 inline-block">
                Pharma
              </span>

            </span>

            <span className="text-xs text-muted-foreground">
              Admin Login
            </span>

          </div>
        </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative  bg-muted lg:block">
        <Image
        src="/h2.jpg"
        alt="Login background"
        fill
        priority
        className="object-cover dark:brightness-[0.2] dark:grayscale"
/>
      </div>
    </div>
  )
}
