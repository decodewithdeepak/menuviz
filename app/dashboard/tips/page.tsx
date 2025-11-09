"use client";

import { 
  Lightbulb, 
  Camera, 
  Palette, 
  Sun,
  CheckCircle,
  XCircle,
  Eye,
  Utensils,
  ChefHat
} from "lucide-react";

const promptTips = [
  {
    id: 1,
    category: "Camera Angles",
    icon: Camera,
    color: "orange",
    tips: [
      {
        title: "Overhead Shot (Top-Down)",
        description: "Perfect for flat lays, pizzas, salads, and plated dishes",
        example: "Overhead shot of margherita pizza with fresh basil",
        good: true,
      },
      {
        title: "45-Degree Angle",
        description: "Most versatile angle, shows depth and layers",
        example: "45-degree angle of layered chocolate cake with ganache",
        good: true,
      },
      {
        title: "Side View (Eye-Level)",
        description: "Great for burgers, sandwiches, and tall dishes",
        example: "Side view of gourmet burger with melting cheese",
        good: true,
      },
      {
        title: "Close-Up (Macro)",
        description: "Highlights texture and details",
        example: "Close-up of crispy fried chicken showing golden texture",
        good: true,
      },
    ],
  },
  {
    id: 2,
    category: "Lighting & Mood",
    icon: Sun,
    color: "blue",
    tips: [
      {
        title: "Natural Lighting",
        description: "Soft, diffused light for fresh and healthy dishes",
        example: "Natural lighting on fresh garden salad with vinaigrette",
        good: true,
      },
      {
        title: "Warm Lighting",
        description: "Cozy, inviting for comfort foods",
        example: "Warm lighting on steaming bowl of ramen with soft-boiled egg",
        good: true,
      },
      {
        title: "Dramatic Lighting",
        description: "High contrast for premium, gourmet dishes",
        example: "Dramatic side lighting on grilled steak with herb butter",
        good: true,
      },
      {
        title: "Bright & Airy",
        description: "Clean, modern look for cafes and bakeries",
        example: "Bright lighting on colorful smoothie bowl with fresh fruits",
        good: true,
      },
    ],
  },
  {
    id: 3,
    category: "Styling & Composition",
    icon: Palette,
    color: "purple",
    tips: [
      {
        title: "Garnish & Props",
        description: "Add fresh herbs, sauce drizzles, or complementary items",
        example: "Pasta carbonara garnished with fresh parsley and cracked pepper",
        good: true,
      },
      {
        title: "Background Choice",
        description: "Rustic wood, marble, or clean white backgrounds",
        example: "Artisan bread on rustic wooden cutting board",
        good: true,
      },
      {
        title: "Color Contrast",
        description: "Make the dish pop with contrasting colors",
        example: "Vibrant green matcha latte on white marble surface",
        good: true,
      },
      {
        title: "Negative Space",
        description: "Leave room around the dish for clean composition",
        example: "Minimalist plating of sushi with negative space around",
        good: true,
      },
    ],
  },
  {
    id: 4,
    category: "Descriptive Details",
    icon: Eye,
    color: "green",
    tips: [
      {
        title: "Texture Words",
        description: "Crispy, creamy, juicy, flaky, tender, golden",
        example: "Crispy golden fried chicken with juicy tender meat inside",
        good: true,
      },
      {
        title: "Temperature Cues",
        description: "Steaming, chilled, frozen, sizzling, melting",
        example: "Steaming hot bowl of pho with rising vapor",
        good: true,
      },
      {
        title: "Action Words",
        description: "Dripping, oozing, melting, cascading, flowing",
        example: "Chocolate lava cake with molten center oozing out",
        good: true,
      },
      {
        title: "Freshness Indicators",
        description: "Fresh, vibrant, colorful, glistening, dewy",
        example: "Fresh strawberries glistening with morning dew",
        good: true,
      },
    ],
  },
];

const dosDonts = [
  {
    category: "Do's",
    items: [
      "Be specific about the dish name and key ingredients",
      "Mention the camera angle (overhead, 45-degree, close-up)",
      "Describe the lighting style (natural, warm, dramatic)",
      "Include texture details (crispy, creamy, juicy)",
      "Specify the background or setting (wooden table, marble)",
      "Add garnish or styling details (fresh herbs, sauce drizzle)",
    ],
  },
  {
    category: "Don'ts",
    items: [
      "Don't be too vague (e.g., just 'food')",
      "Avoid conflicting styles (e.g., rustic + minimalist)",
      "Don't overcomplicate with too many elements",
      "Avoid unrealistic combinations",
      "Don't forget to mention the main dish clearly",
      "Avoid generic descriptions without details",
    ],
  },
];

const examplePrompts = [
  {
    title: "Perfect Prompt Example",
    prompt: "Close-up 45-degree angle shot of gourmet beef burger with melting cheddar cheese, crispy bacon, fresh lettuce, and tomato on a sesame seed bun. Natural lighting, rustic wooden background, sauce slightly dripping.",
    style: "Photorealistic",
    rating: "Excellent",
    color: "green",
  },
  {
    title: "Good Prompt Example",
    prompt: "Overhead shot of margherita pizza with fresh basil, mozzarella, and tomato sauce. Warm lighting, wooden pizza board.",
    style: "Rustic",
    rating: "Good",
    color: "blue",
  },
  {
    title: "Needs Improvement",
    prompt: "Pizza with toppings",
    style: "Any",
    rating: "Too Vague",
    color: "red",
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
                Prompt Writing Tips & Guide
              </h1>
              <p className="text-sm text-gray-600">
                Learn how to write effective prompts for stunning food images
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 p-4 text-center">
            <Camera className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-900">Camera Angles</p>
            <p className="text-xs text-gray-600">4 Types</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-4 text-center">
            <Sun className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-900">Lighting Styles</p>
            <p className="text-xs text-gray-600">4 Types</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-4 text-center">
            <Palette className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-900">Styling Tips</p>
            <p className="text-xs text-gray-600">4 Types</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-4 text-center">
            <Eye className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-900">Details</p>
            <p className="text-xs text-gray-600">4 Types</p>
          </div>
        </div>

        {/* Prompt Tips Sections */}
        <div className="space-y-6 mb-8">
          {promptTips.map((section) => {
            const Icon = section.icon;
            const colorClasses = {
              orange: "from-orange-500 to-orange-600 shadow-orange-500/30",
              blue: "from-blue-500 to-blue-600 shadow-blue-500/30",
              purple: "from-purple-500 to-purple-600 shadow-purple-500/30",
              green: "from-green-500 to-green-600 shadow-green-500/30",
            };

            return (
              <div key={section.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${colorClasses[section.color as keyof typeof colorClasses]} flex items-center justify-center shadow-md`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">{section.category}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.tips.map((tip, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-sm text-gray-900 mb-1">
                            {tip.title}
                          </h3>
                          <p className="text-xs text-gray-600 mb-2">
                            {tip.description}
                          </p>
                          <div className="bg-white rounded-md p-2 border border-gray-200">
                            <p className="text-xs text-gray-700 italic">
                              "{tip.example}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Do's and Don'ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {dosDonts.map((section, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{section.category}</h2>
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
          ))}
        </div>

        {/* Example Prompts */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Example Prompts</h2>
          <div className="space-y-4">
            {examplePrompts.map((example, idx) => {
              const ratingColors = {
                green: "bg-green-50 border-green-200 text-green-700",
                blue: "bg-blue-50 border-blue-200 text-blue-700",
                red: "bg-red-50 border-red-200 text-red-700",
              };

              return (
                <div key={idx} className={`rounded-lg p-4 border-2 ${ratingColors[example.color as keyof typeof ratingColors]}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">{example.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-white border">
                        {example.style}
                      </span>
                      <span className="text-xs font-bold">{example.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm italic">"{example.prompt}"</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pro Tips */}
        <div className="mt-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200 p-6">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-orange-600 flex items-center justify-center flex-shrink-0">
              <ChefHat className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Pro Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Start with the dish name</strong> - Be specific (e.g., "Margherita Pizza" not just "pizza")</li>
                <li>• <strong>Add camera angle</strong> - Overhead, 45-degree, or close-up</li>
                <li>• <strong>Describe textures</strong> - Crispy, creamy, juicy, golden, tender</li>
                <li>• <strong>Mention lighting</strong> - Natural, warm, dramatic, or bright</li>
                <li>• <strong>Include background</strong> - Wooden table, marble, rustic, or minimalist</li>
                <li>• <strong>Use the "Enhance with AI" button</strong> - Let AI optimize your prompt!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

