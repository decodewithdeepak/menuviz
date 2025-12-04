"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  Utensils,
  ChefHat,
  Coffee,
  Pizza,
} from "lucide-react";

const benefits = [
  "No credit card required",
  "Unlimited image generations",
  "High-resolution downloads",
  "Commercial use license",
  "Style presets included",
  "Generation history",
];

export function LandingCTA() {
  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 via-orange-25 to-white p-12 text-center shadow-sm md:p-16">
          {/* Decorative background icons */}
          <div className="absolute inset-0 z-0 opacity-[0.07]">
            <Utensils className="absolute left-8 top-12 h-24 w-24 text-orange-600 rotate-12" />
            <ChefHat className="absolute right-12 top-16 h-32 w-32 text-orange-600 -rotate-12" />
            <Coffee className="absolute left-16 bottom-16 h-28 w-28 text-orange-600 rotate-45" />
            <Pizza className="absolute right-16 bottom-12 h-36 w-36 text-orange-600 -rotate-45" />
          </div>

          <div className="relative z-10">
            <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
              Ready to Transform <br />
              <span className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent cursive-text">
                Your Restaurant Brand?
              </span>
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Join restaurants creating stunning visuals, menus, and logos with AI. Start
              free today.
            </p>

            <div className="mb-10 grid grid-cols-2 gap-4 text-left sm:grid-cols-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <Link href="/signup">
              <Button
                size="lg"
                className="group h-14 gap-2 px-8 text-base font-semibold"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
