"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Megaphone, Dice5 } from "lucide-react";
import { useImageGenerator } from "@/hooks/useImageGenerator";
import { GeneratorLayout } from "@/components/dashboard/generator-layout";

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
    const { generate, isGenerating, generatedImageUrl } = useImageGenerator();

    const handleSurpriseMe = () => {
        const randomPoster = randomPosters[Math.floor(Math.random() * randomPosters.length)];
        setDishName(randomPoster.dish);
        setPromoText(randomPoster.promo);
        setSelectedTheme(randomPoster.theme);
    };

    const handleGenerate = () => {
        if (!dishName) {
            alert("Please enter a dish name");
            return;
        }
        if (!promoText) {
            alert("Please enter promotional text");
            return;
        }

        const prompt = `Create a high-quality promotional food poster for '${dishName}'. The poster must prominently feature the text '${promoText}'. The design theme is ${selectedTheme}. Professional advertising photography, vibrant colors, clear text overlay, appetizing food presentation.`;

        generate({ prompt, style: selectedTheme, type: "poster" });
    };

    return (
        <GeneratorLayout
            title="Ad Poster Generator"
            description="Create eye-catching promotional posters for your dishes"
            isGenerating={isGenerating}
            generatedImageUrl={generatedImageUrl}
            onGenerate={handleGenerate}
            downloadPrefix="poster"
            generateButtonText="Generate Poster"
            generateButtonIcon={<Megaphone className="mr-2 h-5 w-5" />}
            isGenerateDisabled={!dishName || !promoText || isGenerating}
            emptyStateIcon={<Megaphone className="h-12 w-12 text-gray-400" />}
            emptyStateText="Enter details to generate a poster"
            emptyStateSubtext=""
        >
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-semibold text-gray-900">Main Dish Name</label>
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
                        value={dishName}
                        onChange={(e) => setDishName(e.target.value)}
                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                        placeholder="e.g., Double Cheese Burger"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Promotional Text</label>
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
        </GeneratorLayout>
    );
}
