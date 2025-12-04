"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2, Download, RefreshCw, Dice5 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

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

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("minimalist");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [stats, setStats] = useState({ total: 0, downloaded: 0 });

  useEffect(() => {
    fetchStats();
  }, [generatedImageUrl]);

  const fetchStats = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Get total generated images
    const { count: totalCount } = await supabase
      .from("generated_images")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    setStats({
      total: totalCount || 0,
      downloaded: 0, // We don't track downloads yet
    });
  };

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
    } catch (error: any) {
      console.error("Error:", error);
      alert(
        error.message ||
        "Failed to enhance prompt. Make sure your API key is configured."
      );
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedImageUrl(""); // Clear previous image

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login to generate images");
      setIsGenerating(false);
      return;
    }

    // Create history entry
    const { data: historyData, error: historyError } = await supabase
      .from("generation_history")
      .insert({
        user_id: user.id,
        prompt: prompt,
        enhanced_prompt: enhancedPrompt || null,
        style: selectedStyle,
        status: "pending",
      })
      .select()
      .single();

    try {
      // Get user's API key from localStorage
      const userApiKey = localStorage.getItem("gemini_api_key");
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      if (userApiKey) {
        headers["x-gemini-api-key"] = userApiKey;
      }

      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers,
        body: JSON.stringify({
          prompt: enhancedPrompt || prompt,
          style: selectedStyle,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Update history with error
        if (historyData) {
          await supabase
            .from("generation_history")
            .update({
              status: "failed",
              error_message: data.error || "Failed to generate image",
            })
            .eq("id", historyData.id);
        }

        if (response.status === 429) {
          throw new Error(
            data.details ||
            "API quota exceeded. Please try again in a few minutes."
          );
        }
        throw new Error(data.error || "Failed to generate image");
      }

      setGeneratedImageUrl(data.imageUrl);

      // Save to generated_images table
      const { data: imageData, error: imageError } = await supabase
        .from("generated_images")
        .insert({
          user_id: user.id,
          prompt: prompt,
          enhanced_prompt: enhancedPrompt || null,
          style: selectedStyle,
          image_url: data.imageUrl,
        })
        .select()
        .single();

      if (imageError) {
        throw new Error(`Failed to save image: ${imageError.message}`);
      }

      // Update history with success
      if (historyData && imageData) {
        const { error: updateError } = await supabase
          .from("generation_history")
          .update({
            status: "completed",
            image_id: imageData.id,
          })
          .eq("id", historyData.id);

        if (updateError) {
          console.error("Error updating history status:", updateError);
        }
      }
    } catch (error: any) {
      alert(
        error.message ||
        "Failed to generate image. Make sure your API key is configured."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImageUrl) return;

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = generatedImageUrl;

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `menuviz-${timestamp}.png`;
    link.download = fileName;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              Generate Food Images
            </h1>
            <p className="text-sm text-gray-600">
              Describe your menu item and let AI create stunning visuals
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-3 text-center flex-1 sm:flex-none sm:min-w-[100px]">
              <p className="text-lg sm:text-xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-600">Generated</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-3 text-center flex-1 sm:flex-none sm:min-w-[100px]">
              <p className="text-lg sm:text-xl font-bold text-gray-900">∞</p>
              <p className="text-xs text-gray-600">Remaining</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column - Input */}
          <div className="flex flex-col gap-4">
            {/* Prompt Input */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
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

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!prompt || isGenerating || isEnhancing}
              className="w-full h-11 text-sm font-semibold"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : enhancedPrompt ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Image with AI Enhanced Prompt
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
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!generatedImageUrl}
                  onClick={handleGenerate}
                >
                  <RefreshCw className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Regenerate</span>
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
