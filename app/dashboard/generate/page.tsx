"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2, RefreshCw, Dice5 } from "lucide-react";
import { useImageGenerator } from "@/hooks/useImageGenerator";
import { GeneratorLayout } from "@/components/dashboard/generator-layout";

const stylePresets = [
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean and simple aesthetic",
    example: "White background, minimal props",
  },
  {
    id: "photorealistic",
    name: "Photorealistic",
    description: "Professional food photography style",
    example: "Natural lighting, shallow depth of field",
  },
  {
    id: "artistic",
    name: "Artistic",
    description: "Creative and stylized presentation",
    example: "Vibrant colors, artistic composition",
  },
  {
    id: "rustic",
    name: "Rustic",
    description: "Warm and homey atmosphere",
    example: "Wooden background, natural textures",
  },
];

const randomPrompts = [
  "Rich Butter Chicken with garlic naan and pickled onions",
  "Hyderabadi Chicken Biryani with mirchi ka salan and raita",
  "Crispy Masala Dosa with coconut chutney and sambar",
  "Spicy Chole Bhature with fried green chili and onions",
  "Tandoori Chicken Platter with mint chutney and lemon wedges",
  "Rajasthani Dal Baati Churma with pure ghee",
  "Mumbai Style Pav Bhaji with extra butter and toasted pav",
  "Soft Gulab Jamun served warm with vanilla ice cream",
];

export default function FoodGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("minimalist");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { generate, isGenerating, generatedImageUrl } = useImageGenerator();

  const handleSurpriseMe = () => {
    const randomPrompt = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
    setPrompt(randomPrompt);
    setEnhancedPrompt("");
  };

  const handleEnhancePrompt = async () => {
    setIsEnhancing(true);
    try {
      // Get user's API key from localStorage
      const userApiKey = localStorage.getItem("gemini_api_key");
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      if (userApiKey) {
        headers["x-gemini-api-key"] = userApiKey;
      }

      const response = await fetch("/api/enhance-prompt", {
        method: "POST",
        headers,
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to enhance prompt");
      }

      setEnhancedPrompt(data.enhancedPrompt);
      setPrompt(data.enhancedPrompt); // Update text field with enhanced prompt
    } catch (error) {
      console.error("Error:", error);
      alert(
        error instanceof Error ? error.message :
        "Failed to enhance prompt. Make sure your API key is configured."
      );
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerate = () => {
    if (!prompt) {
      alert("Please provide a description to generate an image");
      return;
    }
    generate({ prompt: enhancedPrompt || prompt, style: selectedStyle, type: "enhanced" }); // Assuming 'enhanced' or similar standard type for general generation
  };



  return (
    <GeneratorLayout
      title="Generate Food Images"
      description="Describe your menu item and let AI create stunning visuals"
      isGenerating={isGenerating}
      generatedImageUrl={generatedImageUrl}
      onGenerate={handleGenerate}
      downloadPrefix="menuviz"
      generateButtonText={enhancedPrompt ? "Generate Image with Enhanced Prompt" : "Generate Image"}
      generateButtonIcon={<Sparkles className="mr-2 h-5 w-5" />}
      isGenerateDisabled={!prompt || isGenerating || isEnhancing}
    >
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-gray-900">
              Menu Item Description
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSurpriseMe}
              className="text-xs text-orange-600 hover:text-orange-700 hover:bg-orange-50 h-7"
            >
              <Dice5 className="mr-1.5 h-3.5 w-3.5" />
              Surprise Me
            </Button>
          </div>
          <textarea
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              // Clear enhanced prompt when user types new input
              setEnhancedPrompt("");
            }}
            placeholder="e.g., Paneer Tikka Masala with naan bread"
            className="w-full h-28 px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors resize-none"
          />
          <Button
            onClick={handleEnhancePrompt}
            disabled={!prompt || isEnhancing}
            className="mt-3 w-full"
            variant="outline"
            size="sm"
          >
            {isEnhancing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Enhancing...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Enhance with AI (Optional)
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Style Presets */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Choose Style
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {stylePresets.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${selectedStyle === style.id
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
            >
              <h3 className="font-semibold text-sm text-gray-900 mb-0.5">
                {style.name}
              </h3>
              <p className="text-xs text-gray-600">{style.description}</p>
            </button>
          ))}
        </div>
      </div>
    </GeneratorLayout>
  );
}
