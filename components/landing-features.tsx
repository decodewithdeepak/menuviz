"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Palette, Download, History, Zap, Shield, Sparkles } from "lucide-react"

const features = [
  {
    icon: Wand2,
    title: "AI Prompt Enhancement",
    description: "Transform simple descriptions like 'burger' into detailed prompts with professional photography terms, lighting, and styling details automatically.",
  },
  {
    icon: Palette,
    title: "Style Presets",
    description: "Choose from photorealistic, artistic, minimalist, or rustic styles. Each preset automatically adjusts your prompt for consistent, brand-aligned results.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate professional-quality food images in seconds. No waiting for photographers or editing sessions.",
  },
  {
    icon: Download,
    title: "High-Resolution Downloads",
    description: "Download images in high resolution, perfect for menus, websites, social media, and print materials.",
  },
  {
    icon: History,
    title: "Generation History",
    description: "Access all your created images anytime. Organize, view, download, or delete your visual library with ease.",
  },
  {
    icon: Shield,
    title: "Commercial Use",
    description: "All generated images are yours to use commercially. Perfect for restaurants, cafes, food delivery apps, and more.",
  },
]

export function LandingFeatures() {
  return (
    <section className="relative py-24 px-4 bg-gray-50">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-orange-50/30 to-white" />
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-300 bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 shadow-sm">
            <Sparkles className="h-4 w-4 text-orange-600" />
            <span>Powerful Features</span>
          </div>
          <h2 className="mb-4 mt-6 text-4xl font-bold sm:text-5xl">
            Everything You Need to
            <br />
            <span className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent cursive-text">
              Visualize Your Menu
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Professional-grade tools designed specifically for restaurants and food businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isTopRow = index < 3
            const isLeftColumn = index % 3 === 0
            const isMiddleColumn = index % 3 === 1
            const showTopDiamond = !isTopRow && !isLeftColumn
            
            return (
              <div
                key={feature.title}
                className={`group relative bg-white p-8 transition-all hover:bg-orange-50/50 hover:shadow-xl hover:shadow-orange-500/10 ${
                  !isTopRow ? 'border-t border-orange-200' : ''
                } ${
                  !isLeftColumn ? 'md:border-l border-orange-200' : ''
                }`}
              >
                {/* Diamond at border intersection */}
                {showTopDiamond && (
                  <div className="absolute -left-[5px] -top-[5px] hidden md:block">
                    <div className="h-2.5 w-2.5 rotate-45 border border-orange-300 bg-orange-500 shadow-sm"></div>
                  </div>
                )}
                
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110 group-hover:bg-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-lg font-semibold">{feature.title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
