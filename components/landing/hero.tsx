"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { RiGeminiLine } from "react-icons/ri";
import {
  GiHotMeal,
  GiCoffeeCup,
  GiCakeSlice,
  GiNoodles,
  GiPizzaSlice,
  GiHamburger,
} from "react-icons/gi";
import { useState } from "react";

export function LandingHero() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20">
      {/* Clean background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-orange-50/20 to-white" />

      {/* Decorative background icons - arc formation */}
      <div className="absolute inset-0 -z-10 opacity-[0.1]">
        {/* Left side - 3 icons forming an arc */}
        <GiHotMeal className="absolute left-[10%] top-[20%] h-28 w-28 text-orange-600 -rotate-12" />
        <GiCoffeeCup className="absolute left-[4%] top-[50%] h-32 w-32 text-orange-600 rotate-45" />
        <GiCakeSlice className="absolute left-[10%] top-[80%] h-28 w-28 text-orange-600 rotate-20" />

        {/* Right side - 3 icons forming an arc (mirrored) */}
        <GiNoodles className="absolute right-[10%] top-[20%] h-28 w-28 text-orange-600 rotate-12" />
        <GiPizzaSlice className="absolute right-[4%] top-[50%] h-32 w-32 text-orange-600 -rotate-45" />
        <GiHamburger className="absolute right-[10%] top-[80%] h-28 w-28 text-orange-600 -rotate-20" />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-medium text-orange-700">
          <RiGeminiLine className="h-3.5 w-3.5 text-orange-600" />
          <span>Powered by Google Gemini AI</span>
        </div>

        {/* Main heading */}
        <h1 className="mb-8 text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
          Your All-in-One
          <br />
          <span className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent cursive-text">
            Restaurant Design Studio
          </span>
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
          Create stunning food photos, menus, logos, and marketing materials with AI.
          No camera, no designer, just professional results in seconds.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/signup">
            <Button
              size="lg"
              className="group h-12 gap-2 px-8 text-base font-semibold"
            >
              Start Creating Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="h-12 gap-2 px-8 text-base font-semibold"
            onClick={() => setShowVideo(true)}
          >
            <Play className="h-4 w-4" />
            Watch Demo
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Free to start</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Unlimited Downloads</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>High-resolution</span>
          </div>
        </div>
      </div>

      {/* Video Popup Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-orange-500 transition-colors"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Video Container */}
            <div className="relative overflow-hidden rounded-2xl border-4 border-orange-500 bg-black shadow-2xl">
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/ShQpK5DB8sg?autoplay=1&vq=hd1080&quality=hd1080&hd=1&rel=0&modestbranding=1"
                  title="MenuViz Demo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
