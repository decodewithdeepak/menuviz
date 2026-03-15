"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Palette, Dice5 } from "lucide-react";
import { useImageGenerator } from "@/hooks/useImageGenerator";
import { GeneratorLayout } from "@/components/dashboard/generator-layout";

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
    const { generate, isGenerating, generatedImageUrl } = useImageGenerator();

    const handleSurpriseMe = () => {
        const randomLogo = randomLogos[Math.floor(Math.random() * randomLogos.length)];
        setRestaurantName(randomLogo.name);
        setCuisine(randomLogo.cuisine);
        setSelectedStyle(randomLogo.style);
    };

    const handleGenerate = () => {
        if (!restaurantName || !cuisine) {
            alert("Please fill in the required fields");
            return;
        }
        const prompt = `Design a professional restaurant logo for '${restaurantName}'. The cuisine is ${cuisine}. The design style should be ${selectedStyle}. High resolution, vector style, clean background, professional branding.`;
        generate({ prompt, style: selectedStyle, type: "logo" });
    };

    return (
        <GeneratorLayout
            title="Restaurant Logo Creator"
            description="Design a unique brand identity for your restaurant"
            isGenerating={isGenerating}
            generatedImageUrl={generatedImageUrl}
            onGenerate={handleGenerate}
            downloadPrefix="logo"
            generateButtonText="Generate Logo"
            generateButtonIcon={<Palette className="mr-2 h-5 w-5" />}
            isGenerateDisabled={!restaurantName || !cuisine || isGenerating}
            emptyStateIcon={<Palette className="h-12 w-12 text-gray-400" />}
            emptyStateText="Enter details to generate a logo"
            emptyStateSubtext=""
        >
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-semibold text-gray-900">Restaurant Name</label>
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
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                        placeholder="e.g., The Spice Route"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Cuisine / Theme</label>
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
        </GeneratorLayout>
    );
}
