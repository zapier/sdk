/**
 * GoogleMakerSuite — Zapier SDK example.
 * Generate an image based on a text prompt.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "google-ai-studio", owner: "me" });
  return zapier.apps["google-ai-studio"]({ connection: connection.id });
}

/**
 * Generate Image
 * Generate an image from a text prompt using Gemini or Imagen models.
 */
export async function generateImage() {
  const googleAiStudio = await connect();
  await googleAiStudio.write.generate_image({
    inputs: {
      apiVersion: "v1beta", // optional — default "v1beta" — choices: v1alpha, v1beta
      model: "gemini-2.5-flash-image-preview", // required, dynamic — default "gemini-2.5-flash-image-preview" — The model to use for image generation. Supports Gemini and Imagen models.
      prompt: "A futuristic city skyline at sunset, with flying cars and neon lights.", // required — Describe the image you want to generate. Be specific about style, composition, colors, and detail...
    },
  });
}
