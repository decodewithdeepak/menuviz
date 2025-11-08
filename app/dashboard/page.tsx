"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2, Download, RefreshCw } from "lucide-react";

const stylePresets = [
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
    id: "minimalist",
    name: "Minimalist",
    description: "Clean and simple aesthetic",
    example: "White background, minimal props",
  },
  {
    id: "rustic",
    name: "Rustic",
    description: "Warm and homey atmosphere",
    example: "Wooden background, natural textures",
  },
];

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("photorealistic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");

  const handleEnhancePrompt = async () => {
    setIsEnhancing(true);
    try {
      const response = await fetch("/api/enhance-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to enhance prompt");
      }

      setEnhancedPrompt(data.enhancedPrompt);
      setPrompt(data.enhancedPrompt);
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.message || "Failed to enhance prompt. Make sure your API key is configured.");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedImageUrl(""); // Clear previous image
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: enhancedPrompt || prompt,
          style: selectedStyle,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(data.details || "API quota exceeded. Please try again in a few minutes.");
        }
        throw new Error(data.error || "Failed to generate image");
      }

      setGeneratedImageUrl(data.imageUrl);
      console.log("✅ Image generated successfully:", data.message);
    } catch (error: any) {
      console.error("❌ Error:", error);
      alert(error.message || "Failed to generate image. Make sure your API key is configured.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-full p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Generate Food Images
            </h1>
            <p className="text-sm text-gray-600">
              Describe your menu item and let AI create stunning visuals
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-3">
            <div className="bg-white rounded-lg border border-gray-200 p-3 text-center min-w-[100px]">
              <p className="text-xl font-bold text-gray-900">12</p>
              <p className="text-xs text-gray-600">Generated</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-3 text-center min-w-[100px]">
              <p className="text-xl font-bold text-gray-900">5</p>
              <p className="text-xs text-gray-600">Downloaded</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-3 text-center min-w-[100px]">
              <p className="text-xl font-bold text-gray-900">∞</p>
              <p className="text-xs text-gray-600">Remaining</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column - Input */}
          <div className="flex flex-col gap-4">
            {/* Prompt Input */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Menu Item Description
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Gourmet burger with cheese and bacon"
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
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      selectedStyle === style.id
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

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!prompt || isGenerating}
              className="w-full h-11 text-sm font-semibold"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Image
                </>
              )}
            </Button>
          </div>

          {/* Right Column - Preview */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-900">
                Generated Image
              </label>
              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!generatedImageUrl}
                  onClick={() => {
                    if (generatedImageUrl) {
                      window.open(generatedImageUrl, "_blank");
                    }
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!generatedImageUrl}
                  onClick={handleGenerate}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
              </div>
            </div>

            {/* Image Preview */}
            <div className="flex-1 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
              {isGenerating ? (
                <div className="text-center">
                  <RefreshCw className="h-12 w-12 text-orange-500 animate-spin mx-auto mb-4" />
                  <p className="text-sm font-medium text-gray-600">
                    Creating your image...
                  </p>
                </div>
              ) : generatedImageUrl ? (
                <img
                  src={generatedImageUrl}
                  alt="Generated food image"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-8">
                  <div className="mx-auto h-24 w-24 rounded-2xl border-4 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center mb-4">
                    <Sparkles className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    No image generated yet
                  </p>
                  <p className="text-xs text-gray-500">
                    Enter a description and click generate
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
