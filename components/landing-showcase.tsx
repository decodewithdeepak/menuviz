"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Palette, Camera } from "lucide-react"

const examples = [
  {
    prompt: "Gourmet burger",
    enhanced: "Gourmet burger with golden sesame bun, perfectly grilled beef patty, melted aged cheddar cheese, crispy bacon strips, fresh lettuce, ripe tomato slices, and special sauce, professional food photography, natural lighting, shallow depth of field, appetizing presentation",
    style: "Photorealistic",
    icon: Camera,
  },
  {
    prompt: "Pasta carbonara",
    enhanced: "Creamy pasta carbonara with al dente spaghetti, crispy pancetta, fresh parsley garnish, parmesan cheese shavings, elegant plating, warm restaurant lighting, rustic wooden background, food styling",
    style: "Rustic",
    icon: Palette,
  },
  {
    prompt: "Chocolate cake",
    enhanced: "Decadent chocolate layer cake with rich ganache frosting, chocolate shavings, fresh berries, elegant dessert presentation, soft studio lighting, minimalist composition, high-end patisserie style",
    style: "Minimalist",
    icon: Sparkles,
  },
]

export function LandingShowcase() {
  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            See the
            <span className="relative inline-block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              {" "}Magic{" "}
            </span>
            in Action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Watch how simple descriptions transform into professional food imagery
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {examples.map((example) => {
            const Icon = example.icon
            return (
              <Card
                key={example.prompt}
                className="group overflow-hidden border border-gray-100/30 bg-white shadow-sm transition-all hover:border-orange-200/50 hover:shadow-xl hover:shadow-orange-500/10"
              >
                <div className="relative h-64 bg-gradient-to-br from-orange-100 via-orange-50 to-white">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Icon className="mx-auto mb-4 h-16 w-16 text-primary/50" />
                      <div className="h-32 w-32 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                    {example.style}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4 space-y-3">
                    <div>
                      <p className="mb-1 text-xs font-medium text-muted-foreground">Original Prompt</p>
                      <p className="text-sm font-medium">"{example.prompt}"</p>
                    </div>
                    <div className="h-px bg-border" />
                    <div>
                      <p className="mb-1 text-xs font-medium text-muted-foreground">AI Enhanced</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {example.enhanced}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            These are example transformations. Your actual generated images will be high-resolution and ready to use.
          </p>
        </div>
      </div>
    </section>
  )
}

