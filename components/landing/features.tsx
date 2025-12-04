import Image from "next/image";
import { Camera, Wand2, FileText, Megaphone, Palette, Package } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Food Image Generator",
    description: "Turn text descriptions into mouth-watering food photography. Perfect for menus, social media, and marketing materials.",
    icon: Camera,
    color: "bg-orange-500",
    image: "/features/food.png",
  },
  {
    id: 2,
    title: "Photo Enhancer",
    description: "Upload your own food photos and let AI enhance lighting, colors, and composition to make them look professional.",
    icon: Wand2,
    color: "bg-purple-500",
    image: "/features/enhance.jpg",
  },
  {
    id: 3,
    title: "Menu Maker",
    description: "Design beautiful digital menus complete with AI-generated visuals, pricing, and descriptions in minutes.",
    icon: FileText,
    color: "bg-blue-500",
    image: "/features/menu.jpg",
  },
  {
    id: 4,
    title: "Ad Poster Generator",
    description: "Create eye-catching promotional posters for special offers, new dishes, or events with just a few clicks.",
    icon: Megaphone,
    color: "bg-red-500",
    image: "/features/poster.jpg",
  },
  {
    id: 5,
    title: "Logo Creator",
    description: "Design unique, professional logos for your restaurant brand. Choose from modern, vintage, luxury, or playful styles.",
    icon: Palette,
    color: "bg-pink-500",
    image: "/features/logo.jpg",
  },
  {
    id: 6,
    title: "Packaging Designer",
    description: "Visualize your branding on takeout boxes, bags, and cups. Create professional mockups for your delivery business.",
    icon: Package,
    color: "bg-green-500",
    image: "/features/packaging.jpg",
  },
];

export function LandingFeatures() {
  return (
    <section className="relative py-24 px-4 bg-gray-50">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-orange-50/30 to-white" />
      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl text-gray-900">
            Powerful Tools for
            <br />
            <span className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent cursive-text">
              Modern Restaurants
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            Everything you need to build your brand and market your food
          </p>
        </div>

        <div className="relative">
          <div className="flex flex-col gap-12 pb-32">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="sticky group"
                  style={{ top: `${130 + index * 20}px` }}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl p-8 shadow-xl transition-transform duration-500 ease-in-out md:p-12 border-4 border-orange-500/20 ring-1 ring-orange-500/30 max-w-5xl mx-auto">
                    <div className="grid gap-8 md:grid-cols-2 items-center">
                      <div className="order-1 md:order-1">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-inner">
                          <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-102"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-tr ${feature.color} opacity-10 mix-blend-overlay`} />
                        </div>
                      </div>
                      <div className="order-2 md:order-2">
                        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} mb-6 shadow-lg`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="mb-4 text-3xl font-bold text-gray-900">
                          {feature.title}
                        </h3>
                        <p className="text-lg leading-relaxed text-gray-600 mb-8">
                          {feature.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          <span className="h-px w-8 bg-gray-900"></span>
                          FEATURE {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
