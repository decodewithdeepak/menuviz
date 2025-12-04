"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Type, Wand2, Image as ImageIcon, Download } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Type,
    title: "Describe Your Vision",
    description:
      "Select a tool and describe what you want. E.g., 'Spicy Paneer Tikka' for photos or 'Modern Coffee Shop' for logos.",
  },
  {
    step: "02",
    icon: Wand2,
    title: "AI Magic",
    description:
      "Our AI automatically enhances your prompt with professional details, lighting, and style preferences.",
  },
  {
    step: "03",
    icon: ImageIcon,
    title: "Generate Assets",
    description:
      "Watch as AI creates high-quality food photos, menus, posters, or logos in seconds.",
  },
  {
    step: "04",
    icon: Download,
    title: "Download & Use",
    description:
      "Download your assets in high resolution and use them on your menu, website, or social media immediately.",
  },
];

export function LandingHowItWorks() {
  return (
    <section className="relative py-24 px-4 bg-white">
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
            How It{" "}
            <span className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent cursive-text">
              Works
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Creating professional food imagery has never been easier. Four
            simple steps to stunning results.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.step}
                className="group relative border border-orange-200 bg-white shadow-sm transition-all hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10"
              >
                <CardHeader>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-4xl font-bold text-muted-foreground/20">
                      {step.step}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
                {index < steps.length - 1 && (
                  <div className="absolute -right-8 top-1/2 hidden -translate-y-1/2 text-primary lg:block">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  );
}
