"use client";

import Link from "next/link";
import { IoFastFood } from "react-icons/io5";
import { Linkedin, Mail } from "lucide-react";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

export function Footer() {
  return (
    <section className="relative max-h-fit mt-0">
      <footer className="border-t border-gray-200 max-h-fit overflow-hidden bg-white mt-20 z-[101] relative">
        <div className="max-w-7xl flex flex-col justify-between mx-auto h-[30rem] sm:h-[35rem] md:h-[40rem] z-30 relative p-4 py-10">
          <div className="flex flex-col mb-12 sm:mb-20 md:mb-0 w-full">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-2 flex flex-col items-center flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-3xl font-bold">
                    MenuViz
                  </span>
                </div>
                <p className="text-gray-700 font-semibold text-center sm:w-96">
                  AI-powered menu visualization for modern restaurants. Create
                  stunning food images optimized for your business.
                </p>
              </div>
              <div className="flex mb-8 mt-3 gap-4">
                <Link
                  href="https://linkedin.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-6 h-6 hover:text-orange-500 duration-300" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="https://twitter.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter className="w-6 h-6 hover:text-orange-500 duration-300" />
                  <span className="sr-only">X (Twitter)</span>
                </Link>
                <Link
                  href="https://instagram.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="w-6 h-6 hover:text-orange-500 duration-300" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="mailto:contact@menuviz.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-6 h-6 hover:text-orange-500 duration-300" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500">
                <Link
                  className="hover:text-orange-500 duration-300 hover:font-semibold"
                  href="/about"
                >
                  About
                </Link>
                <Link
                  className="hover:text-orange-500 duration-300 hover:font-semibold"
                  href="/contact"
                >
                  Contact
                </Link>
                <Link
                  className="hover:text-orange-500 duration-300 hover:font-semibold"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>
                <Link
                  className="hover:text-orange-500 duration-300 hover:font-semibold"
                  href="/terms-of-service"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-20 md:mt-24 z-25 flex flex-col gap-1 items-center justify-center md:flex-row md:items-center md:justify-between">
            <p className="text-base text-muted-foreground">
              ©{new Date().getFullYear()} MenuViz. All rights reserved.
            </p>
            <nav className="flex gap-4">
              <Link
                href="https://deepakmodi.tech"
                target="_blank"
                className="text-base text-muted-foreground hover:text-orange-500 transition-colors duration-300 hover:font-medium"
              >
                Crafted by Deepak Modi
              </Link>
            </nav>
          </div>
        </div>
        {/* Large background text */}
        <div className="bg-gradient-to-b from-gray-900/20 via-gray-900/10 to-transparent bg-clip-text text-transparent text-[4rem] sm:text-[8rem] md:text-[10rem] lg:text-[13rem] leading-tight absolute left-1/2 -translate-x-1/2 bottom-40 md:bottom-32 z-10 font-extrabold tracking-tighter pointer-events-none">
          MENU.VIZ
        </div>
        {/* Bottom logo */}
        <div className="absolute border-2 border-orange-400/50 flex items-center justify-center p-3 hover:border-orange-500 duration-400 hover:shadow-[0_0px_20px_rgba(249,115,22,0.4)] bottom-24 md:bottom-20 backdrop-blur-sm z-30 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] bg-white/60 left-1/2 -translate-x-1/2 shadow-[0_0px_30px_rgba(249,115,22,0.3)]">
          <div className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl sm:rounded-3xl md:rounded-[2rem] flex items-center justify-center shadow-lg shadow-orange-500/50">
            <IoFastFood className="w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 text-white drop-shadow-lg" />
          </div>
        </div>
        {/* Bottom line */}
        <div className="absolute bottom-32 sm:bottom-34 backdrop-blur-sm z-25 h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent w-full left-1/2 -translate-x-1/2"></div>
        {/* Bottom shadow */}
        <div className="bg-gradient-to-t from-white via-white/80 blur-[1em] to-white/40 absolute bottom-28 z-22 w-full h-24"></div>
      </footer>
    </section>
  );
}
