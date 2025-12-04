"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Download, RefreshCw, Palette, Dice5 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const logoStyles = [
    { id: "modern", name: "Modern & Minimal", description: "Clean lines, geometric shapes, simple fonts" },
    { id: "vintage", name: "Vintage & Retro", description: "Classic typography, badges, textured look" },
    { id: "luxury", name: "Luxury & Elegant", description: "Gold accents, serif fonts, sophisticated" },
    { id: "playful", name: "Playful & Fun", description: "Bright colors, mascots, rounded fonts" },
];

const randomLogos = [
    {
        name: "The Curry House",
        cuisine: "Indian",
        style: "vintage"
    },
    {
        name: "Burger Bros",
        cuisine: "Fast Food",
        style: "playful"
    },
    {
        name: "Saffron & Silk",
        cuisine: "Fine Dining",
        style: "luxury"
    },
    {
        name: "Green Leaf Cafe",
        cuisine: "Vegan",
        style: "modern"
    }
];

export default function LogoCreatorPage() {
    const [restaurantName, setRestaurantName] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [selectedStyle, setSelectedStyle] = useState("modern");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState("");

    const handleSurpriseMe = () => {
        const randomLogo = randomLogos[Math.floor(Math.random() * randomLogos.length)];
        setRestaurantName(randomLogo.name);
        setCuisine(randomLogo.cuisine);
        setSelectedStyle(randomLogo.style);
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setGeneratedImageUrl("");

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert("Please login to generate logos");
            setIsGenerating(false);
            return;
        }

        const prompt = `Design a professional restaurant logo for '${restaurantName}'. The cuisine is ${cuisine}. The design style should be ${selectedStyle}. High resolution, vector style, clean background, professional branding.`;

        try {
            const userApiKey = localStorage.getItem("gemini_api_key");
            const headers: HeadersInit = { "Content-Type": "application/json" };
            if (userApiKey) headers["x-gemini-api-key"] = userApiKey;

            const response = await fetch("/api/generate-image", {
                method: "POST",
                headers,
                body: JSON.stringify({ prompt, style: selectedStyle, type: "logo" }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Failed to generate logo");

            setGeneratedImageUrl(data.imageUrl);

            await supabase.from("generated_images").insert({
                user_id: user.id,
                prompt: prompt,
                style: selectedStyle,
                image_url: data.imageUrl,
            });

        } catch (error: any) {
            alert(error.message || "Failed to generate logo");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownload = () => {
        if (!generatedImageUrl) return;
        const link = document.createElement("a");
        link.href = generatedImageUrl;
        link.download = `logo-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-full p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Restaurant Logo Creator</h1>
                    <p className="text-sm text-gray-600">Design a unique brand identity for your restaurant</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Restaurant Name</label>
                                <input
                                    type="text"
                                    value={restaurantName}
                                    onChange={(e) => setRestaurantName(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                                    placeholder="e.g., The Spice Route"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-semibold text-gray-900">Cuisine / Theme</label>
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
                                <input
                                    type="text"
                                    value={cuisine}
                                    onChange={(e) => setCuisine(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                                    placeholder="e.g., Indian, Fast Food"
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <label className="block text-sm font-semibold text-gray-900 mb-3">Choose Style</label>
                            <div className="grid grid-cols-2 gap-2.5">
                                {logoStyles.map((style) => (
                                    <button
                                        key={style.id}
                                        onClick={() => setSelectedStyle(style.id)}
                                        className={`p-3 rounded-lg border-2 text-left transition-all ${selectedStyle === style.id ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300 bg-white"
                                            }`}
                                    >
                                        <div className="font-semibold text-sm text-gray-900">{style.name}</div>
                                        <div className="text-xs text-gray-600">{style.description}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Button
                            onClick={handleGenerate}
                            disabled={!restaurantName || !cuisine || isGenerating}
                            className="w-full h-11 text-sm font-semibold"
                        >
                            {isGenerating ? (
                                <>
                                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                                    Generating Logo...
                                </>
                            ) : (
                                <>
                                    <Palette className="mr-2 h-5 w-5" />
                                    Generate Logo
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm h-full min-h-[500px] flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-semibold text-gray-900">Preview</label>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" disabled={!generatedImageUrl} onClick={handleDownload}>
                                    <Download className="h-4 w-4 sm:mr-2" />
                                    <span className="hidden sm:inline">Download</span>
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 rounded-lg bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                            {isGenerating ? (
                                <div className="text-center">
                                    <RefreshCw className="h-12 w-12 text-orange-500 animate-spin mx-auto mb-4" />
                                    <p className="text-sm text-gray-600">Designing your logo...</p>
                                </div>
                            ) : generatedImageUrl ? (
                                <img src={generatedImageUrl} alt="Generated Logo" className="w-full h-full object-contain p-8" />
                            ) : (
                                <div className="text-center p-8">
                                    <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-sm text-gray-600">Enter details to generate a logo</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
