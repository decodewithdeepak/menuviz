"use client";

import { X, Check } from "lucide-react";
import { IoClose, IoCheckmark } from "react-icons/io5";

const comparisons = [
  {
    feature: "Cost",
    traditional: "Hundreds to thousands per session",
    menuviz: "Free to start, unlimited generations",
  },
  {
    feature: "Time Required",
    traditional: "Days or weeks for shoots and editing",
    menuviz: "Images ready in seconds",
  },
  {
    feature: "Consistency",
    traditional: "Varies by photographer and conditions",
    menuviz: "Perfect consistency every time",
  },
  {
    feature: "Menu Updates",
    traditional: "Requires new photography sessions",
    menuviz: "Update instantly anytime",
  },
  {
    feature: "Equipment Needed",
    traditional: "Professional cameras, lighting, props",
    menuviz: "Just your computer or phone",
  },
];

export function LandingProblem() {
  return (
    <section className="relative py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
            Why Choose{" "}
            <span className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent cursive-text">
              MenuViz
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            See how MenuViz compares to traditional food photography
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-2xl shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-2">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6 text-center">
              <h3 className="text-xl font-bold text-white">MenuViz</h3>
            </div>
            <div className="bg-gray-600 px-8 py-6 text-center">
              <h3 className="text-xl font-bold text-white">Traditional Photography</h3>
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((item, index) => (
            <div
              key={item.feature}
              className={`grid grid-cols-2 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              {/* MenuViz */}
              <div className="flex items-center gap-3 px-8 py-5 border-r border-gray-200">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500">
                  <IoCheckmark className="h-4 w-4 text-white" />
                </div>
                <span className="text-base text-gray-900 font-medium">
                  {item.menuviz}
                </span>
              </div>

              {/* Traditional */}
              <div className="flex items-center gap-3 px-8 py-5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500">
                  <IoClose className="h-4 w-4 text-white" />
                </div>
                <span className="text-base text-gray-700">
                  {item.traditional}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
