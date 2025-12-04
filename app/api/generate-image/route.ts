import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const { prompt, style, type = "food" } = await req.json();

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Check for API key
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Style-specific enhancements with focus on close-up food photography
    const styleEnhancements: Record<string, string> = {
      minimalist:
        "minimalist close-up composition, white background, clean aesthetic, simple elegant plating, soft natural lighting, modern style, focus on food details, macro shot, high contrast",
      photorealistic:
        "professional close-up food photography, macro shot, natural lighting, shallow depth of field, high resolution, detailed textures showing ingredients, restaurant quality plating, appetizing presentation, focus on the food details, blurred background",
      artistic:
        "artistic close-up food styling, creative composition, vibrant colors, dramatic lighting, unique angle, detailed food textures, artistic presentation, macro photography, shallow depth of field",
      rustic:
        "rustic close-up shot, wooden background slightly blurred, natural textures visible, warm lighting, homey atmosphere, artisanal presentation, focus on food in foreground, cozy setting, macro details",
    };

    let fullPrompt = "";

    if (type === "menu") {
      fullPrompt = `Professional restaurant menu design: ${prompt}. High resolution, clear typography, appetizing food elements integrated into the layout.`;
    } else if (type === "poster") {
      fullPrompt = `Professional advertising poster design: ${prompt}. High impact visual, clear text overlay, vibrant colors, commercial photography style.`;
    } else if (type === "logo") {
      fullPrompt = `Professional vector logo design: ${prompt}. Minimalist, clean lines, scalable, white background, high quality branding identity.`;
    } else {
      // Default "food" type
      const stylePrompt =
        styleEnhancements[style] || styleEnhancements.photorealistic;
      fullPrompt = `Close-up, detailed food photography: ${prompt}. ${stylePrompt}. Shot from a 45-degree angle, filling the frame with the food. The dish should be the main focus, highly detailed, mouth-watering, and professionally styled for a restaurant menu. Sharp focus on the food with beautiful bokeh background.`;
    }

    // Use Gemini 2.5 Flash Image (Nano Banana) for image generation
    const result = await generateText({
      model: google("gemini-3-pro-image-preview"),
      prompt: fullPrompt,
    });

    // Extract image from files
    if (result.files && result.files.length > 0) {
      const imageFile = result.files.find((f) =>
        f.mediaType.startsWith("image/")
      );
      if (imageFile && imageFile.uint8Array) {
        const base64String = Buffer.from(imageFile.uint8Array).toString(
          "base64"
        );
        const imageUrl = `data:${imageFile.mediaType};base64,${base64String}`;

        return Response.json({
          success: true,
          prompt: fullPrompt,
          imageUrl: imageUrl,
          message: "Image generated successfully",
        });
      }
    }

    // Fallback error if no image was generated
    return Response.json(
      { error: "No image was generated in the response" },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Error generating image:", error);

    // Handle quota exceeded error
    if (error.message?.includes("quota") || error.message?.includes("429")) {
      return Response.json(
        {
          error: "API quota exceeded. Please wait a moment and try again.",
          details:
            "The free tier has daily limits. Try again in a few minutes.",
        },
        { status: 429 }
      );
    }

    return Response.json(
      { error: error.message || "Failed to generate image" },
      { status: 500 }
    );
  }
}
