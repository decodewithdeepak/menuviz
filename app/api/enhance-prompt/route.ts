import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Check for user's API key from header or use shared key
    const userApiKey = req.headers.get("x-gemini-api-key");
    const apiKey = userApiKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Use Vercel AI SDK with Gemini 2.0 Flash
    const { text } = await generateText({
      model: google("gemini-3-pro-preview"),
      prompt: `You are a professional food photography prompt engineer. Transform this simple menu item description into a detailed, professional prompt for AI image generation.

Original description: "${prompt}"

Create a detailed prompt that includes:
- Specific food details (ingredients, preparation style)
- Professional photography terms (lighting, composition, depth of field)
- Styling and presentation details
- Background and props
- Color and texture descriptions
- Make it appetizing and restaurant-quality

Return ONLY the enhanced prompt, no explanations or additional text.`,
      temperature: 0.7,
      maxOutputTokens: 1024,
    });

    return Response.json({ enhancedPrompt: text.trim() });
  } catch (error: any) {
    console.error("Error enhancing prompt:", error);
    return Response.json(
      { error: error.message || "Failed to enhance prompt" },
      { status: 500 }
    );
  }
}
