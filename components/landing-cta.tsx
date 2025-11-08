"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"

const benefits = [
  "No credit card required",
  "Unlimited image generations",
  "High-resolution downloads",
  "Commercial use license",
  "Style presets included",
  "Generation history",
]

export function LandingCTA() {
  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-orange-100/50 bg-gradient-to-br from-orange-50 via-orange-25 to-white p-12 text-center shadow-xl shadow-orange-500/10 md:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,140,0,0.15),transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Ready to Transform
              <br />
              <span className="relative inline-block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
                Your Menu?
              </span>
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Join restaurants creating stunning visual menus with AI. Start free today—no credit card required.
            </p>

            <div className="mb-10 grid grid-cols-2 gap-4 text-left sm:grid-cols-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <Link href="/signup">
              <Button size="lg" className="group h-14 gap-2 px-8 text-base font-semibold">
                Get Started Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Free forever. Upgrade anytime for advanced features.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
