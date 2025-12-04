"use client";

import {
  Lightbulb,
  Camera,
  Palette,
  CheckCircle,
  XCircle,
  ChefHat,
  FileText,
  Megaphone,
  Package,
  Wand2,
  Sparkles,
  PenLine,
  Rocket
} from "lucide-react";
import Link from "next/link";

const featureGuides = [
  {
    id: "food",
    title: "Food Image Generator",
    icon: Camera,
    href: "/dashboard",
    color: "orange",
    description: "Create stunning AI food photography for your menu",
    tips: [
      "Be specific about the dish name (e.g., 'Butter Chicken' not just 'curry')",
      "Mention camera angles: overhead, 45-degree, close-up, or side view",
      "Describe textures: crispy, creamy, juicy, golden, tender",
      "Specify lighting: natural, warm, dramatic, or bright & airy",
      "Include background: wooden table, marble, rustic, or minimalist",
      "Use the 'Enhance with AI' button to optimize your prompt!"
    ],
    example: "Close-up 45-degree angle shot of butter chicken with creamy tomato gravy, garnished with fresh cream and coriander leaves. Warm lighting, rustic wooden background."
  },
  {
    id: "enhance",
    title: "Photo Enhancer",
    icon: Wand2,
    href: "/dashboard/enhance",
    color: "purple",
    description: "Upload and enhance your food photos with AI",
    tips: [
      "Upload high-resolution images for best results",
      "Works best with well-lit photos of actual food",
      "Great for improving smartphone food photography",
      "Can fix lighting, colors, and make food look more appetizing",
      "Use for real photos you've taken at your restaurant"
    ],
    example: "Upload a dim photo of your signature dish and watch AI brighten it, enhance colors, and make it menu-ready!"
  },
  {
    id: "menu",
    title: "Menu Maker",
    icon: FileText,
    href: "/dashboard/menu",
    color: "blue",
    description: "Design beautiful digital menus for your restaurant",
    tips: [
      "Enter your restaurant's actual name for branding",
      "Choose the cuisine type that matches your restaurant",
      "Add 3-5 menu items with accurate descriptions",
      "Include prices in your local currency (₹, $, €)",
      "Use appetizing descriptions: 'Slow-cooked', 'Fresh', 'Homemade'",
      "Select a theme that matches your restaurant's ambiance"
    ],
    example: "Restaurant: The Curry House | Cuisine: North Indian | Items: Butter Chicken (₹350) - Tender chicken in rich tomato cream sauce"
  },
  {
    id: "poster",
    title: "Ad Poster Generator",
    icon: Megaphone,
    href: "/dashboard/posters",
    color: "red",
    description: "Create eye-catching promotional posters",
    tips: [
      "Focus on one hero dish per poster for maximum impact",
      "Include a clear offer: '20% OFF', 'Buy 1 Get 1', 'Today's Special'",
      "Keep the price prominent and easy to read",
      "Use action words: 'Order Now', 'Limited Time', 'Try Today'",
      "Great for social media ads and in-store displays",
      "Choose bold colors that match your brand"
    ],
    example: "Dish: Paneer Tikka | Price: ₹249 | Offer: Weekend Special - 20% OFF!"
  },
  {
    id: "logo",
    title: "Logo Creator",
    icon: Palette,
    href: "/dashboard/logo",
    color: "pink",
    description: "Design professional logos for your restaurant brand",
    tips: [
      "Use a short, memorable restaurant name (2-3 words max)",
      "Specify the cuisine type for relevant imagery",
      "Choose a style that reflects your brand: Modern, Vintage, Luxury, or Playful",
      "Modern: Clean lines, minimalist, tech-forward",
      "Vintage: Classic, nostalgic, hand-drawn feel",
      "Luxury: Elegant, sophisticated, gold accents",
      "Playful: Fun, colorful, family-friendly"
    ],
    example: "Restaurant: Spice Junction | Cuisine: Indian Street Food | Style: Playful"
  },
  {
    id: "packaging",
    title: "Packaging Designer",
    icon: Package,
    href: "/dashboard/packaging",
    color: "green",
    description: "Create branded packaging mockups for takeout",
    tips: [
      "Enter your complete brand name as you want it on packaging",
      "Add a catchy tagline that describes your food philosophy",
      "Specify brand colors (e.g., 'Orange and Red', 'Black and Gold')",
      "Box: Best for main course containers and combo meals",
      "Bag: Perfect for takeout carry bags with logo",
      "Cup: Ideal for beverages like chai, coffee, or lassi",
      "Full Set: Shows complete branding across all packaging"
    ],
    example: "Brand: Urban Bites | Tagline: Street Food Reimagined | Colors: Black and Gold | Type: Full Set | Style: Premium"
  }
];

const dosDonts = [
  {
    category: "Do's",
    icon: CheckCircle,
    items: [
      "Use the 'Surprise Me' button for quick inspiration",
      "Be specific with dish names and ingredients",
      "Match your selections to your actual restaurant brand",
      "Download and save your creations to Gallery",
      "Experiment with different styles for variety",
      "Use generated content for social media and marketing"
    ],
  },
  {
    category: "Don'ts",
    icon: XCircle,
    items: [
      "Don't use vague descriptions like just 'food' or 'dish'",
      "Avoid conflicting styles in the same design",
      "Don't skip entering brand colors for packaging",
      "Avoid using very long restaurant names for logos",
      "Don't forget to specify pricing for menu items",
      "Avoid unrealistic or impossible food combinations"
    ],
  },
];

export default function TipsPage() {
  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Tips & Feature Guide
              </h1>
              <p className="text-sm text-gray-600">
                Learn how to get the best results from all MenuViz features
              </p>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {featureGuides.map((feature) => {
            const Icon = feature.icon;
            const colorClasses: Record<string, string> = {
              orange: "from-orange-50 to-orange-100 border-orange-200 hover:border-orange-400",
              purple: "from-purple-50 to-purple-100 border-purple-200 hover:border-purple-400",
              blue: "from-blue-50 to-blue-100 border-blue-200 hover:border-blue-400",
              red: "from-red-50 to-red-100 border-red-200 hover:border-red-400",
              pink: "from-pink-50 to-pink-100 border-pink-200 hover:border-pink-400",
              green: "from-green-50 to-green-100 border-green-200 hover:border-green-400",
            };
            const iconColors: Record<string, string> = {
              orange: "text-orange-600",
              purple: "text-purple-600",
              blue: "text-blue-600",
              red: "text-red-600",
              pink: "text-pink-600",
              green: "text-green-600",
            };

            return (
              <Link
                key={feature.id}
                href={feature.href}
                className={`bg-gradient-to-br ${colorClasses[feature.color]} rounded-xl border-2 p-4 text-center transition-all hover:shadow-md cursor-pointer`}
              >
                <Icon className={`h-6 w-6 ${iconColors[feature.color]} mx-auto mb-2`} />
                <p className="text-xs font-semibold text-gray-900 line-clamp-2">{feature.title}</p>
              </Link>
            );
          })}
        </div>

        {/* Feature Guides */}
        <div className="space-y-6 mb-8">
          {featureGuides.map((feature) => {
            const Icon = feature.icon;
            const colorClasses: Record<string, string> = {
              orange: "from-orange-500 to-orange-600 shadow-orange-500/30",
              purple: "from-purple-500 to-purple-600 shadow-purple-500/30",
              blue: "from-blue-500 to-blue-600 shadow-blue-500/30",
              red: "from-red-500 to-red-600 shadow-red-500/30",
              pink: "from-pink-500 to-pink-600 shadow-pink-500/30",
              green: "from-green-500 to-green-600 shadow-green-500/30",
            };
            const bgColors: Record<string, string> = {
              orange: "bg-orange-50 border-orange-200",
              purple: "bg-purple-50 border-purple-200",
              blue: "bg-blue-50 border-blue-200",
              red: "bg-red-50 border-red-200",
              pink: "bg-pink-50 border-pink-200",
              green: "bg-green-50 border-green-200",
            };

            return (
              <div key={feature.id} id={feature.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${colorClasses[feature.color]} flex items-center justify-center shadow-md`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{feature.title}</h2>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tips List */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-yellow-500" /> Tips for Best Results</h3>
                    <ul className="space-y-2">
                      {feature.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Example */}
                  <div className={`rounded-lg p-4 border ${bgColors[feature.color]}`}>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5"><PenLine className="h-4 w-4 text-gray-600" /> Example Prompt</h3>
                    <p className="text-sm text-gray-700 italic">"{feature.example}"</p>
                    <Link
                      href={feature.href}
                      className="inline-block mt-3 text-xs font-semibold text-orange-600 hover:text-orange-700"
                    >
                      Try it now →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Do's and Don'ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {dosDonts.map((section, idx) => {
            const SectionIcon = section.icon;
            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <SectionIcon className={`h-5 w-5 ${idx === 0 ? 'text-green-600' : 'text-red-600'}`} />
                  {section.category}
                </h2>
                <ul className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      {idx === 0 ? (
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Pro Tips */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200 p-6">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-orange-600 flex items-center justify-center flex-shrink-0">
              <ChefHat className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><Rocket className="h-5 w-5 text-orange-600" /> Pro Tips for Restaurant Owners</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Consistency is Key:</strong> Use the same brand colors and style across Logo, Menu, and Packaging</li>
                <li>• <strong>Social Media Ready:</strong> Generated posters are perfect for Instagram and Facebook ads</li>
                <li>• <strong>Menu Psychology:</strong> Use appetizing descriptions with texture words like "crispy", "creamy", "tender"</li>
                <li>• <strong>Cloud Kitchens:</strong> Use Packaging Designer to visualize your delivery branding before printing</li>
                <li>• <strong>Save Favorites:</strong> All generated images are saved to your Gallery for easy access</li>
                <li>• <strong>Iterate:</strong> Not happy with a result? Hit generate again or tweak your prompt!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
