"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { RiGeminiLine } from "react-icons/ri";
import {
  GiHotMeal,
  GiCoffeeCup,
  GiCakeSlice,
  GiNoodles,
  GiPizzaSlice,
  GiHamburger,
} from "react-icons/gi";

export function LandingHero() {
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
          Your Menu Deserves
          <br />
          <span className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent cursive-text">
            Better Photos
          </span>
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
          Turn simple menu descriptions into mouth-watering visuals with AI. No
          camera, no photographer, just stunning food images in seconds.
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
          <Link href="/demo">
            <Button
              size="lg"
              variant="outline"
              className="h-12 gap-2 px-8 text-base font-semibold"
            >
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>No credit card</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Free to start</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>High-resolution</span>
          </div>
        </div>
      </div>
    </section>
  );
}
