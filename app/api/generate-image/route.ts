import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();

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

    // Style-specific enhancements
    const styleEnhancements: Record<string, string> = {
      photorealistic:
        "professional food photography, natural lighting, shallow depth of field, high resolution, detailed textures, restaurant quality",
      artistic:
        "artistic food styling, creative composition, vibrant colors, dramatic lighting, unique perspective, artistic presentation",
      minimalist:
        "minimalist composition, white background, clean aesthetic, simple plating, soft lighting, modern style",
      rustic:
        "rustic wooden background, natural textures, warm lighting, homey atmosphere, artisanal presentation, cozy setting",
    };

    const stylePrompt =
      styleEnhancements[style] || styleEnhancements.photorealistic;
    
    // Add timestamp to prevent caching
    const timestamp = Date.now();
    const fullPrompt = `[Request ID: ${timestamp}] A photorealistic food photograph of: ${prompt}. Style: ${stylePrompt}. The image should be appetizing, well-lit, and restaurant-quality. Generate a unique image.`;

    // Use Gemini 2.5 Flash Image (Nano Banana) for image generation
    const result = await generateText({
      model: google("gemini-2.5-flash-image"),
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

        return Response.json(
          {
            success: true,
            prompt: fullPrompt,
            imageUrl: imageUrl,
            message: "Image generated successfully",
            timestamp: timestamp, // Include timestamp in response
          },
          {
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate",
              "Pragma": "no-cache",
              "Expires": "0",
            },
          }
        );
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
