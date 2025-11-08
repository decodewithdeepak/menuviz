"use client";

import Image from "next/image";
import { Sparkles, Palette, Camera } from "lucide-react";

const examples = [
  {
    prompt: "Gulab Jamun",
    enhanced:
      "Soft gulab jamun dessert balls soaked in fragrant rose-cardamom syrup, garnished with pistachios and silver leaf, elegant plating on white ceramic, soft studio lighting, minimalist composition, high-end Indian sweet shop style",
    style: "Minimalist",
    icon: Sparkles,
    image: "/dishes/gulab-jamun.webp",
  },
  {
    prompt: "Paneer Tikka Masala",
    enhanced:
      "Paneer Tikka Masala with tender cubes of cottage cheese in rich, creamy tomato-based gravy, aromatic spices, garnished with fresh coriander, served with warm naan bread, professional food photography, natural lighting, shallow depth of field, appetizing presentation, vibrant orange-red color",
    style: "Photorealistic",
    icon: Camera,
    image: "/dishes/paneer-tikka-masala.webp",
  },
  {
    prompt: "Masala Dosa",
    enhanced:
      "Crispy golden masala dosa with perfectly fermented rice and lentil crepe, spiced potato filling, served with coconut chutney and sambar, traditional South Indian presentation, warm restaurant lighting, rustic wooden background, authentic food styling",
    style: "Rustic",
    icon: Palette,
    image: "/dishes/masala-dosa.webp",
  },
];

export function LandingShowcase() {
  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
            See the{" "}
            <span className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent cursive-text">
              Magic
            </span>{" "}
            in Action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Watch how simple descriptions transform into professional food
            imagery
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {examples.map((example) => {
            const Icon = example.icon;
            return (
              <div
                key={example.prompt}
                className="group overflow-hidden rounded-lg border border-orange-200 bg-white shadow-sm transition-all hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10"
              >
                <div className="relative h-64 bg-gradient-to-br from-orange-100 via-orange-50 to-white">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Icon className="mx-auto mb-4 h-16 w-16 text-primary/50" />
                      <div className="relative h-40 w-40 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 overflow-hidden">
                        <Image
                          src={example.image}
                          alt={example.prompt}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                    {example.style}
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div>
                      <p className="mb-1 text-xs font-medium text-muted-foreground">
                        Original Prompt
                      </p>
                      <p className="text-sm font-medium">"{example.prompt}"</p>
                    </div>
                    <div className="h-px bg-border" />
                    <div>
                      <p className="mb-1 text-xs font-medium text-muted-foreground">
                        AI Enhanced
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {example.enhanced}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            These are example transformations. Your actual generated images will
            be high-resolution and ready to use.
          </p>
        </div>
      </div>
    </section>
  );
}
