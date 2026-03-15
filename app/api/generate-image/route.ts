import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { experimental_generateImage as generateImage } from "ai";
import { AI_MODELS } from "@/lib/models";
import { createClient } from "@/lib/supabase/server";


export async function POST(req: Request) {
  try {
    const { prompt, style, type = "food", image } = await req.json();

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!prompt && !image) {
      return Response.json(
        { error: "Prompt or Image is required" },
        { status: 400 },
      );
    }

    // Check for user's API key from header or use shared key
    const userApiKey = req.headers.get("x-gemini-api-key");
    const activeKey = userApiKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!activeKey) {
      return Response.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    const google = createGoogleGenerativeAI({
      apiKey: activeKey,
    });

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
    } else if (type === "packaging") {
      fullPrompt = `Professional product packaging mockup: ${prompt}. Photorealistic 3D render, studio lighting, soft shadows, high quality product photography, clean background.`;
    } else {
      // Default "food" type
      const stylePrompt =
        styleEnhancements[style] || styleEnhancements.photorealistic;

      const basePrompt = prompt || "Delicious food dish";

      fullPrompt = `Close-up, detailed food photography: ${basePrompt}. ${stylePrompt}. Shot from a 45-degree angle, filling the frame with the food. The dish should be the main focus, highly detailed, mouth-watering, and professionally styled for a restaurant menu. Sharp focus on the food with beautiful bokeh background.`;
    }

    // If an image is provided, explicitly instruct the AI on how to handle the I2I process
    if (image) {
      fullPrompt += "\n\nCRITICAL INSTRUCTION: Analyze the provided reference image. Maintain the core structure, placement, and shapes within the original image (such as the specific dish structure or any visible branding/logos). Your job is to powerfully enhance this image to match the professional styling described above, elevating it to an appetizing, high-resolution, restaurant-quality standard without altering the fundamental composition of the reference.";
    }

    // Use Centralized AI Model
    const { image: generatedImage } = await generateImage({
      model: google.image(AI_MODELS.IMAGE_GENERATION),
      prompt: fullPrompt,
    });

    if (generatedImage && generatedImage.base64) {
      const imageUrl = `data:image/jpeg;base64,${generatedImage.base64}`;
      
      // Save generation natively on the server to prevent data loss or client manipulation
      const { error: insertError } = await supabase.from("generated_images").insert({
        user_id: user.id,
        prompt: fullPrompt,
        style: style,
        image_url: imageUrl,
      });

      if (insertError) {
        console.error("Failed to save to history:", insertError);
        // We still return the image even if history fails, but we could choose to handle this differently
      }

      return Response.json({
        success: true,
        prompt: fullPrompt,
        imageUrl: imageUrl,
        message: "Image generated successfully",
      });
    }

    // Fallback error if no image was generated
    return Response.json(
      { error: "No image was generated in the response" },
      { status: 500 },
    );
  } catch (error) {
    console.error("Error generating image:", error);

    // Handle quota exceeded error
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    if (errorMessage.includes("quota") || errorMessage.includes("429")) {
      return Response.json(
        {
          error: "API quota exceeded. Please wait a moment and try again.",
          details:
            "The free tier has daily limits. Try again in a few minutes.",
        },
        { status: 429 },
      );
    }

    return Response.json(
      { error: errorMessage || "Failed to generate image" },
      { status: 500 },
    );
  }
}
