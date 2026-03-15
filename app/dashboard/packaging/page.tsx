"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Package, Dice5 } from "lucide-react";
import { useImageGenerator } from "@/hooks/useImageGenerator";
import { GeneratorLayout } from "@/components/dashboard/generator-layout";

const packagingTypes = [
    { id: "box", name: "Takeout Box", description: "Classic cardboard food container" },
    { id: "bag", name: "Paper Bag", description: "Branded paper carry bag" },
    { id: "cup", name: "Coffee Cup", description: "Hot beverage cup with sleeve" },
    { id: "combo", name: "Full Set", description: "Box, bag, napkin, and cup together" },
];

const packagingStyles = [
    { id: "minimal", name: "Minimal", description: "Clean, simple branding" },
    { id: "bold", name: "Bold & Colorful", description: "Vibrant, eye-catching design" },
    { id: "eco", name: "Eco-Friendly", description: "Kraft paper, green aesthetics" },
    { id: "premium", name: "Premium", description: "Luxury feel, metallic accents" },
];

const randomPackaging = [
    {
        brand: "Spice Box Kitchen",
        tagline: "Authentic Indian Flavors",
        colors: "Orange and Red",
        type: "box",
        style: "bold"
    },
    {
        brand: "Green Leaf Cafe",
        tagline: "Fresh. Healthy. Delicious.",
        colors: "Green and White",
        type: "bag",
        style: "eco"
    },
    {
        brand: "Urban Bites",
        tagline: "Street Food Reimagined",
        colors: "Black and Gold",
        type: "combo",
        style: "premium"
    },
    {
        brand: "Chai & Co.",
        tagline: "The Perfect Brew",
        colors: "Brown and Cream",
        type: "cup",
        style: "minimal"
    }
];

export default function PackagingDesignerPage() {
    const [brandName, setBrandName] = useState("");
    const [tagline, setTagline] = useState("");
    const [brandColors, setBrandColors] = useState("");
    const [selectedType, setSelectedType] = useState("box");
    const [selectedStyle, setSelectedStyle] = useState("minimal");
    const { generate, isGenerating, generatedImageUrl } = useImageGenerator();

    const handleSurpriseMe = () => {
        const random = randomPackaging[Math.floor(Math.random() * randomPackaging.length)];
        setBrandName(random.brand);
        setTagline(random.tagline);
        setBrandColors(random.colors);
        setSelectedType(random.type);
        setSelectedStyle(random.style);
    };

    const handleGenerate = () => {
        if (!brandName || !brandColors) {
            alert("Please fill in the required fields");
            return;
        }

        const typeLabel = packagingTypes.find(t => t.id === selectedType)?.name || "packaging";
        const styleLabel = packagingStyles.find(s => s.id === selectedStyle)?.name || "modern";

        const prompt = `Create a professional product mockup of ${typeLabel} for a restaurant brand called '${brandName}'. 
        The tagline is '${tagline}'. 
        Use brand colors: ${brandColors}. 
        The design style should be ${styleLabel}. 
        Show the packaging on a clean studio background with soft shadows. 
        High quality, photorealistic 3D render, professional product photography.`;

        generate({ prompt, style: selectedStyle, type: "packaging" });
    };

    return (
        <GeneratorLayout
            title="Packaging Designer"
            description="Create branded packaging mockups for your takeout business"
            isGenerating={isGenerating}
            generatedImageUrl={generatedImageUrl}
            onGenerate={handleGenerate}
            downloadPrefix="packaging"
            generateButtonText="Generate Packaging"
            generateButtonIcon={<Package className="mr-2 h-5 w-5" />}
            isGenerateDisabled={!brandName || !tagline || isGenerating}
            emptyStateIcon={<Package className="h-12 w-12 text-gray-400" />}
            emptyStateText="Enter brand details to generate packaging"
            emptyStateSubtext=""
        >
            {/* Brand Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-semibold text-gray-900">Brand Name</label>
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
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                        placeholder="e.g., Spice Box Kitchen"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Tagline / Slogan</label>
                    <input
                        type="text"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                        placeholder="e.g., Authentic Indian Flavors"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Brand Colors</label>
                    <input
                        type="text"
                        value={brandColors}
                        onChange={(e) => setBrandColors(e.target.value)}
                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                        placeholder="e.g., Orange and Red"
                    />
                </div>
            </div>

            {/* Packaging Type */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Packaging Type</label>
                <div className="grid grid-cols-2 gap-2.5">
                    {packagingTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setSelectedType(type.id)}
                            className={`p-3 rounded-lg border-2 text-left transition-all ${selectedType === type.id ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300 bg-white"
                                }`}
                        >
                            <div className="font-semibold text-sm text-gray-900">{type.name}</div>
                            <div className="text-xs text-gray-600">{type.description}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Design Style */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Design Style</label>
                <div className="grid grid-cols-2 gap-2.5">
                    {packagingStyles.map((style) => (
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
