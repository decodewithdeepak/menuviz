"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function Navbar() {
  return (
    <div className="fixed top-0 z-50 w-full px-4 pt-4">
      <nav className="container mx-auto max-w-7xl rounded-2xl border border-gray-300 bg-white/90 shadow-lg shadow-black/[0.03] backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl transition-all hover:scale-105">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-md shadow-orange-500/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">MenuViz</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex font-medium">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

