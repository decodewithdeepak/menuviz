"use client";

import { X, Check } from "lucide-react";

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
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Why Choose{" "}
            <span className="relative inline-block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              MenuViz
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            See how MenuViz compares to traditional food photography
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-gray-100 bg-gray-50/50 px-6 py-4">
            <div className="text-sm font-semibold text-gray-500"></div>
            <div className="flex items-center justify-center text-sm font-semibold text-gray-700">
              Traditional Photography
            </div>
            <div className="flex items-center justify-center text-sm font-semibold text-orange-600">
              MenuViz
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((item, index) => (
            <div
              key={item.feature}
              className={`grid grid-cols-3 px-6 py-5 ${
                index !== comparisons.length - 1
                  ? "border-b border-gray-100"
                  : ""
              } hover:bg-gray-50/50 transition-colors`}
            >
              {/* Feature */}
              <div className="flex items-center font-medium text-gray-900">
                {item.feature}
              </div>

              {/* Traditional */}
              <div className="flex items-center justify-center px-4">
                <div className="flex items-start gap-2 text-center">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <span className="text-sm text-gray-600">
                    {item.traditional}
                  </span>
                </div>
              </div>

              {/* MenuViz */}
              <div className="flex items-center justify-center px-4">
                <div className="flex items-start gap-2 text-center">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-900 font-medium">
                    {item.menuviz}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
