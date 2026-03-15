"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Dice5 } from "lucide-react";
import { useImageGenerator } from "@/hooks/useImageGenerator";
import { GeneratorLayout } from "@/components/dashboard/generator-layout";

const menuStyles = [
    { id: "modern", name: "Modern Minimalist", description: "Clean lines, plenty of whitespace" },
    { id: "chalkboard", name: "Chalkboard", description: "Rustic cafe style on black chalkboard" },
    { id: "elegant", name: "Elegant Fine Dining", description: "Sophisticated fonts, gold accents" },
    { id: "vibrant", name: "Vibrant & Pop", description: "Bold colors, high energy" },
];

const randomMenus = [
    {
        name: "Punjab Grill",
        cuisine: "North Indian",
        items: "Butter Chicken - ₹450, Dal Makhani - ₹350, Garlic Naan - ₹80, Paneer Tikka - ₹320, Lassi - ₹120"
    },
    {
        name: "Madras Cafe",
        cuisine: "South Indian",
        items: "Masala Dosa - ₹140, Idli Sambar - ₹90, Medu Vada - ₹100, Filter Coffee - ₹50, Rava Kesari - ₹80"
    },
    {
        name: "Biryani Blues",
        cuisine: "Hyderabadi",
        items: "Chicken Dum Biryani - ₹350, Mutton Biryani - ₹450, Mirchi Ka Salan - ₹120, Double Ka Meetha - ₹150"
    },
    {
        name: "Chaat Chatore",
        cuisine: "Street Food",
        items: "Pani Puri (6pcs) - ₹60, Pav Bhaji - ₹150, Aloo Tikki - ₹100, Raj Kachori - ₹140, Masala Chai - ₹40"
    }
];

export default function MenuMakerPage() {
    const [restaurantName, setRestaurantName] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [menuItems, setMenuItems] = useState("");
    const [selectedStyle, setSelectedStyle] = useState("modern");
    const { generate, isGenerating, generatedImageUrl } = useImageGenerator();

    const handleSurpriseMe = () => {
        const randomMenu = randomMenus[Math.floor(Math.random() * randomMenus.length)];
        setRestaurantName(randomMenu.name);
        setCuisine(randomMenu.cuisine);
        setMenuItems(randomMenu.items);
    };

    const handleGenerate = () => {
        if (!restaurantName || !cuisine || !menuItems) {
            alert("Please fill in the required fields");
            return;
        }

        const prompt = `Design a professional restaurant menu for '${restaurantName}' serving ${cuisine} cuisine. The menu should list the following items: ${menuItems}. The design style should be ${selectedStyle}. High resolution, detailed, appetizing food background, clear typography.`;
        generate({ prompt, style: selectedStyle, type: "menu" });
    };

    return (
        <GeneratorLayout
            title="Menu Maker"
            description="Create stunning menu layouts for your restaurant"
            isGenerating={isGenerating}
            generatedImageUrl={generatedImageUrl}
            onGenerate={handleGenerate}
            downloadPrefix="menu"
            generateButtonText="Generate Menu"
            generateButtonIcon={<FileText className="mr-2 h-5 w-5" />}
            isGenerateDisabled={!restaurantName || !menuItems || isGenerating}
            emptyStateIcon={<FileText className="h-12 w-12 text-gray-400" />}
            emptyStateText="Enter details to generate a menu"
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
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Cuisine Type</label>
                    <input
                        type="text"
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                        placeholder="e.g., Indian, Italian"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Menu Items</label>
                    <textarea
                        value={menuItems}
                        onChange={(e) => setMenuItems(e.target.value)}
                        className="w-full h-24 px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                        placeholder="List your items here..."
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Choose Style</label>
                <div className="grid grid-cols-2 gap-2.5">
                    {menuStyles.map((style) => (
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
