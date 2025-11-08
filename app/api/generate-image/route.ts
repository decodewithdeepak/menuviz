import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { experimental_generateImage as generateImage } from "ai";

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Check for user's API key from header or use shared key
    const userApiKey = req.headers.get('x-gemini-api-key');
    const apiKey = userApiKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Create Google AI provider with API key
    const google = createGoogleGenerativeAI({ apiKey });

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

    const stylePrompt = styleEnhancements[style] || styleEnhancements.photorealistic;
    const fullPrompt = `Generate a high-quality, professional food photograph: ${prompt}, ${stylePrompt}. The image should be appetizing, well-lit, and restaurant-quality.`;

    // Use Vercel AI SDK with Gemini 2.5 Flash Image
    const googleImageModel = google.image("gemini-2.5-flash-image");
    
    const { image } = await generateImage({
      model: googleImageModel,
      prompt: fullPrompt,
      providerOptions: {
        google: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
        },
      },
    });

    // Convert image to base64 data URL
    const imageBytes = image.uint8Array;
    const base64String = Buffer.from(imageBytes).toString('base64');
    const imageUrl = `data:image/png;base64,${base64String}`;

    return Response.json({
      success: true,
      prompt: fullPrompt,
      imageUrl: imageUrl,
      message: "Image generated successfully",
    });
  } catch (error: any) {
    console.error("Error generating image:", error);
    
    // Handle quota exceeded error
    if (error.message?.includes("quota") || error.message?.includes("429")) {
      return Response.json(
        { 
          error: "API quota exceeded. Please wait a moment and try again.",
          details: "The free tier has daily limits. Try again in a few minutes or use your own API key."
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
