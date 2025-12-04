"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Download, RefreshCw, Megaphone, Dice5 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const posterThemes = [
    { id: "promo", name: "Promotional", description: "Bold text, high contrast, sales focused" },
    { id: "festival", name: "Festive", description: "Celebratory atmosphere, decorative elements" },
    { id: "luxury", name: "Luxury", description: "Gold/Black theme, premium feel" },
    { id: "social", name: "Social Media", description: "Square format, trendy aesthetics" },
];

const randomPosters = [
    {
        dish: "Special Chicken Biryani",
        promo: "Unlimited @ ₹299 Only!",
        theme: "festival"
    },
    {
        dish: "Maharaja Thali",
        promo: "Weekend Special: Flat 20% Off",
        theme: "luxury"
    },
    {
        dish: "Crispy Masala Dosa",
        promo: "Breakfast Combo @ ₹99",
        theme: "social"
    },
    {
        dish: "Paneer Tikka Pizza",
        promo: "Buy 1 Get 1 Free",
        theme: "promo"
    }
];

export default function PosterMakerPage() {
    const [dishName, setDishName] = useState("");
    const [promoText, setPromoText] = useState("");
    const [selectedTheme, setSelectedTheme] = useState("promo");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState("");

    const handleSurpriseMe = () => {
        const randomPoster = randomPosters[Math.floor(Math.random() * randomPosters.length)];
        setDishName(randomPoster.dish);
        setPromoText(randomPoster.promo);
        setSelectedTheme(randomPoster.theme);
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setGeneratedImageUrl("");

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert("Please login to generate posters");
            setIsGenerating(false);
            return;
        }

        const prompt = `Create a high-quality promotional food poster for '${dishName}'. The poster must prominently feature the text '${promoText}'. The design theme is ${selectedTheme}. Professional advertising photography, vibrant colors, clear text overlay, appetizing food presentation.`;

        try {
            const userApiKey = localStorage.getItem("gemini_api_key");
            const headers: HeadersInit = { "Content-Type": "application/json" };
            if (userApiKey) headers["x-gemini-api-key"] = userApiKey;

            const response = await fetch("/api/generate-image", {
                method: "POST",
                headers,
                body: JSON.stringify({ prompt, style: selectedTheme, type: "poster" }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Failed to generate poster");

            setGeneratedImageUrl(data.imageUrl);

            await supabase.from("generated_images").insert({
                user_id: user.id,
                prompt: prompt,
                style: selectedTheme,
                image_url: data.imageUrl,
            });

        } catch (error: any) {
            alert(error.message || "Failed to generate poster");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownload = () => {
        if (!generatedImageUrl) return;
        const link = document.createElement("a");
        link.href = generatedImageUrl;
        link.download = `poster-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-full p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Ad Poster Generator</h1>
                    <p className="text-sm text-gray-600">Create eye-catching promotional posters for your dishes</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Main Dish Name</label>
                                <input
                                    type="text"
                                    value={dishName}
                                    onChange={(e) => setDishName(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                                    placeholder="e.g., Double Cheese Burger"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-semibold text-gray-900">Promotional Text</label>
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
                                    value={promoText}
                                    onChange={(e) => setPromoText(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                                    placeholder="e.g., Buy 1 Get 1 Free"
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <label className="block text-sm font-semibold text-gray-900 mb-3">Choose Theme</label>
                            <div className="grid grid-cols-2 gap-2.5">
                                {posterThemes.map((theme) => (
                                    <button
                                        key={theme.id}
                                        onClick={() => setSelectedTheme(theme.id)}
                                        className={`p-3 rounded-lg border-2 text-left transition-all ${selectedTheme === theme.id ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300 bg-white"
                                            }`}
                                    >
                                        <div className="font-semibold text-sm text-gray-900">{theme.name}</div>
                                        <div className="text-xs text-gray-600">{theme.description}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Button
                            onClick={handleGenerate}
                            disabled={!dishName || !promoText || isGenerating}
                            className="w-full h-11 text-sm font-semibold"
                        >
                            {isGenerating ? (
                                <>
                                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                                    Generating Poster...
                                </>
                            ) : (
                                <>
                                    <Megaphone className="mr-2 h-5 w-5" />
                                    Generate Poster
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
                                    <p className="text-sm text-gray-600">Creating your poster...</p>
                                </div>
                            ) : generatedImageUrl ? (
                                <img src={generatedImageUrl} alt="Generated Poster" className="w-full h-full object-contain" />
                            ) : (
                                <div className="text-center p-8">
                                    <Megaphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-sm text-gray-600">Enter details to generate a poster</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
