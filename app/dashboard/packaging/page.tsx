"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Package, Dice5 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

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
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState("");

    const handleSurpriseMe = () => {
        const random = randomPackaging[Math.floor(Math.random() * randomPackaging.length)];
        setBrandName(random.brand);
        setTagline(random.tagline);
        setBrandColors(random.colors);
        setSelectedType(random.type);
        setSelectedStyle(random.style);
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setGeneratedImageUrl("");

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert("Please login to generate packaging designs");
            setIsGenerating(false);
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

        try {
            const userApiKey = localStorage.getItem("gemini_api_key");
            const headers: HeadersInit = { "Content-Type": "application/json" };
            if (userApiKey) headers["x-gemini-api-key"] = userApiKey;

            const response = await fetch("/api/generate-image", {
                method: "POST",
                headers,
                body: JSON.stringify({ prompt, style: selectedStyle, type: "packaging" }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Failed to generate packaging");

            setGeneratedImageUrl(data.imageUrl);

            await supabase.from("generated_images").insert({
                user_id: user.id,
                prompt: prompt,
                style: selectedStyle,
                image_url: data.imageUrl,
            });

        } catch (error: any) {
            alert(error.message || "Failed to generate packaging design");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownload = () => {
        if (!generatedImageUrl) return;
        const link = document.createElement("a");
        link.href = generatedImageUrl;
        link.download = `packaging-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-full p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Packaging Designer</h1>
                    <p className="text-sm text-gray-600">Create branded packaging mockups for your takeout business</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <div className="flex flex-col gap-4">
                        {/* Brand Details */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Brand Name</label>
                                <input
                                    type="text"
                                    value={brandName}
                                    onChange={(e) => setBrandName(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                                    placeholder="e.g., Spice Box Kitchen"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-semibold text-gray-900">Tagline / Slogan</label>
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

                        <Button
                            onClick={handleGenerate}
                            disabled={!brandName || !tagline || isGenerating}
                            className="w-full h-11 text-sm font-semibold"
                        >
                            {isGenerating ? (
                                <>
                                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                                    Generating Mockup...
                                </>
                            ) : (
                                <>
                                    <Package className="mr-2 h-5 w-5" />
                                    Generate Packaging
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Preview */}
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
                                    <p className="text-sm text-gray-600">Creating your packaging mockup...</p>
                                </div>
                            ) : generatedImageUrl ? (
                                <img src={generatedImageUrl} alt="Generated Packaging" className="w-full h-full object-contain p-4" />
                            ) : (
                                <div className="text-center p-8">
                                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-sm text-gray-600">Enter brand details to generate packaging</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
