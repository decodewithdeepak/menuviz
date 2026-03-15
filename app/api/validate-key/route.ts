import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { AI_MODELS } from "@/lib/models";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { apiKey } = await req.json();

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!apiKey) {
      return Response.json({ error: "API key is required" }, { status: 400 });
    }

    // Attempt a tiny, cheap generation to validate the key
    const result = await generateText({
      model: google(AI_MODELS.TEXT_ENHANCEMENT),
      prompt: "Reply with 'Valid'",
      headers: {
        "x-goog-api-key": apiKey,
      },
    });

    if (result.text) {
      return Response.json({ success: true, message: "API key is valid" });
    }

    return Response.json({ error: "Failed to validate key" }, { status: 400 });
  } catch (error) {
    console.error("Error validating API key:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Invalid API Key";
    
    return Response.json(
      { error: errorMessage },
      { status: 401 }
    );
  }
}
