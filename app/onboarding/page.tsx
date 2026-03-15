"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoFastFood } from "react-icons/io5";
import { Loader2, UploadCloud, Store, ChefHat, Utensils } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { completeOnboarding } from "./actions";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await completeOnboarding(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Welcome Banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-12 flex-col justify-center relative overflow-hidden">
        <div className="z-10 text-white max-w-lg mx-auto">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-md shadow-orange-500/30 mb-8">
            <IoFastFood className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-6">
            Welcome to MenuViz!
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Let's set up your restaurant workspace. We need just a few details to personalize your experience and brand your generated content.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-gray-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-orange-500">
                <Store className="h-5 w-5" />
              </div>
              <p>Set your restaurant name</p>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-orange-500">
                <UploadCloud className="h-5 w-5" />
              </div>
              <p>Upload your brand logo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white min-h-screen overflow-y-auto">
        <div className="w-full max-w-md py-12">
          
          <div className="mb-8 lg:hidden text-center">
            <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-md mb-4">
              <IoFastFood className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome to MenuViz!</h2>
            <p className="text-gray-600 text-sm mt-2">Let's set up your workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Restaurant Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Store className="w-4 h-4 text-orange-500" />
                Restaurant Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="restaurantName"
                required
                placeholder="e.g. The Spicy Spoon"
                className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-0 focus:outline-none transition-colors bg-white"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-orange-500" />
                Your Role <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Select name="role" required>
                  <SelectTrigger className="w-full !h-12 !py-0 flex items-center px-4 text-base border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-0 focus:outline-none transition-colors bg-white hover:bg-white shadow-none data-[state=open]:border-orange-500">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-100 rounded-lg shadow-xl">
                    <SelectItem value="Owner" className="text-base cursor-pointer hover:bg-orange-50 focus:bg-orange-50">Owner</SelectItem>
                    <SelectItem value="Manager" className="text-base cursor-pointer hover:bg-orange-50 focus:bg-orange-50">Manager</SelectItem>
                    <SelectItem value="Chef" className="text-base cursor-pointer hover:bg-orange-50 focus:bg-orange-50">Chef</SelectItem>
                    <SelectItem value="Marketing" className="text-base cursor-pointer hover:bg-orange-50 focus:bg-orange-50">Marketing / Agency</SelectItem>
                    <SelectItem value="Other" className="text-base cursor-pointer hover:bg-orange-50 focus:bg-orange-50">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Primary Cuisine */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-orange-500" />
                Primary Cuisine <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                name="primaryCuisine"
                placeholder="e.g. Italian, Sushi, Cafe"
                className="w-full h-12 px-4 text-base border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-0 focus:outline-none transition-colors bg-white"
              />
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-orange-500" />
                Restaurant Logo <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 transition-colors bg-gray-50 flex items-center justify-center overflow-hidden">
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" className="h-full object-contain p-2" />
                ) : (
                  <div className="text-center px-4">
                    <p className="text-sm font-medium text-gray-600">Click or drag to upload</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                  </div>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 text-base font-semibold mt-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Setting up workspace...
                </>
              ) : (
                "Complete Setup"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
