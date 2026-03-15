import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { AI_MODELS } from "@/lib/models";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
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

    // Use Vercel AI SDK with centralized Text model
    const { text } = await generateText({
      model: google(AI_MODELS.TEXT_ENHANCEMENT),
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
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Failed to enhance prompt" },
      { status: 500 },
    );
  }
}
