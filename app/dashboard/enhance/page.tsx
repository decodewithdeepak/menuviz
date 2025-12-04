"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Upload, RefreshCw, Download, Wand2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function EnhancePage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [description, setDescription] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
                setDescription(""); // Clear previous description
                setGeneratedImageUrl(""); // Clear previous generation
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedImage) return;

        setIsAnalyzing(true);
        try {
            const userApiKey = localStorage.getItem("gemini_api_key");
            const headers: HeadersInit = { "Content-Type": "application/json" };
            if (userApiKey) headers["x-gemini-api-key"] = userApiKey;

            const response = await fetch("/api/analyze-image", {
                method: "POST",
                headers,
                body: JSON.stringify({ image: selectedImage }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to analyze image");

            setDescription(data.description);
        } catch (error: any) {
            alert(error.message || "Failed to analyze image");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setGeneratedImageUrl("");

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert("Please login to generate images");
            setIsGenerating(false);
            return;
        }

        try {
            const userApiKey = localStorage.getItem("gemini_api_key");
            const headers: HeadersInit = { "Content-Type": "application/json" };
            if (userApiKey) headers["x-gemini-api-key"] = userApiKey;

            const response = await fetch("/api/generate-image", {
                method: "POST",
                headers,
                body: JSON.stringify({ prompt: description, style: "photorealistic" }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Failed to generate image");

            setGeneratedImageUrl(data.imageUrl);

            await supabase.from("generated_images").insert({
                user_id: user.id,
                prompt: description,
                style: "enhanced",
                image_url: data.imageUrl,
            });

        } catch (error: any) {
            alert(error.message || "Failed to generate image");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownload = () => {
        if (!generatedImageUrl) return;
        const link = document.createElement("a");
        link.href = generatedImageUrl;
        link.download = `enhanced-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-full p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Photo Enhancer</h1>
                    <p className="text-sm text-gray-600">Upload your food photos and let AI reimagine them in professional quality</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <div className="flex flex-col gap-4">
                        {/* Upload Section */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <label className="block text-sm font-semibold text-gray-900 mb-3">1. Upload Photo</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors"
                            >
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Upload preview" className="max-h-48 mx-auto rounded-lg object-contain" />
                                ) : (
                                    <>
                                        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP up to 5MB</p>
                                    </>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </div>

                            <Button
                                onClick={handleAnalyze}
                                disabled={!selectedImage || isAnalyzing}
                                className="w-full mt-4"
                                variant="outline"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing Image...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="mr-2 h-4 w-4" />
                                        Analyze & Improve
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Description Section */}
                        {description && (
                            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">2. AI Enhanced Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full h-32 px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                                />
                                <Button
                                    onClick={handleGenerate}
                                    disabled={isGenerating}
                                    className="w-full mt-3 h-11 text-sm font-semibold"
                                >
                                    {isGenerating ? (
                                        <>
                                            <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                                            Generating New Version...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="mr-2 h-5 w-5" />
                                            Generate Professional Version
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Preview Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm h-full min-h-[500px] flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-semibold text-gray-900">Result</label>
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
                                    <p className="text-sm text-gray-600">Reimagining your photo...</p>
                                </div>
                            ) : generatedImageUrl ? (
                                <img src={generatedImageUrl} alt="Enhanced Result" className="w-full h-full object-contain" />
                            ) : (
                                <div className="text-center p-8">
                                    <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-sm text-gray-600">Upload a photo to start enhancing</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
