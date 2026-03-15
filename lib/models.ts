/**
 * Centralized configuration for AI Models used across the application.
 * Update these constants to switch or A/B test different Google Gemini models.
 */

export const AI_MODELS = {
  // Model used for text generation, prompt enhancement, and data extraction
  TEXT_ENHANCEMENT: "gemini-2.5-flash",

  // Model used for actual image generation (including Image-to-Image / Nano Banana)
  IMAGE_GENERATION: "gemini-3.1-flash-image-preview",
};
