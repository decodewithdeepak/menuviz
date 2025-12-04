import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return Response.json({ error: "Image is required" }, { status: 400 });
    }

    // Check for API key
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Remove data:image/jpeg;base64, prefix if present
    const base64Image = image.replace(
      /^data:image\/(png|jpeg|jpg|webp);base64,/,
      ""
    );

    const result = await generateText({
      model: google("gemini-3-pro-preview"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this food image and provide a highly detailed, appetizing description that could be used as a prompt to generate a professional, high-quality version of this dish. Focus on the ingredients, textures, lighting, plating, and mood. Make it sound delicious and restaurant-quality.",
            },
            { type: "image", image: base64Image },
          ],
        },
      ],
    });

    return Response.json({
      success: true,
      description: result.text,
    });
  } catch (error: any) {
    console.error("Error analyzing image:", error);
    return Response.json(
      { error: error.message || "Failed to analyze image" },
      { status: 500 }
    );
  }
}
