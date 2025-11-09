"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoFastFood } from "react-icons/io5";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 z-50 w-full px-4 pt-4 transition-all duration-300">
      <nav
        className={`container mx-auto rounded-2xl border border-gray-300 bg-white/90 shadow-lg shadow-black/[0.03] backdrop-blur-xl transition-all duration-500 ${
          isScrolled ? "max-w-2xl" : "max-w-5xl"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-xl transition-all hover:scale-105"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-md shadow-orange-500/30">
              <IoFastFood className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              MenuViz
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex font-medium hover:text-orange-600"
              >
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
  );
}
