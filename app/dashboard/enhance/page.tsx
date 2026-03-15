"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Upload, RefreshCw, Download } from "lucide-react";
import { useImageGenerator } from "@/hooks/useImageGenerator";
import { downloadImage } from "@/lib/utils";

export default function EnhancePage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [description, setDescription] = useState("");
    const { generate, isGenerating, generatedImageUrl } = useImageGenerator();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
                // Can't clear generated image immediately without changing hook state, but that's fine.
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = () => {
        if (!description && !selectedImage) {
            alert("Please provide a description or upload an image to enhance");
            return;
        }
        generate({ prompt: description, style: "enhanced", type: "enhanced", image: selectedImage || undefined });
    };

    const handleDownload = () => {
        if (generatedImageUrl) downloadImage(generatedImageUrl, "enhanced");
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
                        </div>

                        {/* Instructions Section */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                            <label className="block text-sm font-semibold text-gray-900 mb-2">2. Instructions (Optional)</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="E.g. Make it look like a Michelin star dish, add warm lighting..."
                                className="w-full h-24 px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none mb-3"
                            />
                            <Button
                                onClick={handleGenerate}
                                disabled={!selectedImage || isGenerating}
                                className="w-full h-11 text-sm font-semibold"
                            >
                                {isGenerating ? (
                                    <>
                                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                                        Enhancing Photo...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-5 w-5" />
                                        Enhance Photo
                                    </>
                                )}
                            </Button>
                        </div>
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
