import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/providers/auth-provider";
import { toast } from "sonner";

interface GenerateParams {
  prompt: string;
  style: string;
  type: "enhanced" | "logo" | "menu" | "packaging" | "poster";
  image?: string; // For enhancement
}

export function useImageGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const { user } = useAuth();

  const generate = async ({ prompt, style, type, image }: GenerateParams) => {
    setIsGenerating(true);
    setGeneratedImageUrl("");

    if (!user) {
      toast.error("Authentication Required", {
        description: "Please login to generate images.",
      });
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
        body: JSON.stringify({ prompt, style, type, image }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
           throw new Error("Your provided API key is invalid or unauthorized.");
        } else if (response.status === 429) {
           throw new Error("API Quota Exceeded. You have run out of credits.");
        }
        throw new Error(data.error || "Failed to generate image");
      }

      setGeneratedImageUrl(data.imageUrl);

      toast.success("Image Generated successfully!", {
        description: "Your new visual is ready down below.",
      });
    } catch (error) {
      // Clear key if unauthorized
      if (error instanceof Error && error.message.includes("unauthorized")) {
         localStorage.removeItem("gemini_api_key");
      }
      
      toast.error("Generation Failed", {
        description: error instanceof Error ? error.message : "An unexpected error occurred during generation.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return { generate, isGenerating, generatedImageUrl };
}
