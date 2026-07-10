/**
 * Plaud — Zapier SDK example.
 * Retrieve a completed transcript and summary of an AI-generated session.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "plaud", owner: "me" });
  return zapier.apps.plaud({ connection: connection.id });
}

/**
 * Transcript & Summary Ready
 * Triggers when an audio file submission for transcription summary, re-transcription, or re-summary is completed.
 */
export async function getAiGenerationComplete() {
  const plaud = await connect();
  await plaud.read.new_ai_generation_complete({
    inputs: {
      minimum_duration: 0, // optional — default 0 — Set to "10" to only activate for recordings ≥10 minutes. Set to "0" to activate for all recordings.
      format_for_transcript_and_summary: "detailed", // optional — default "Markdown" — choices: Markdown, Rich Text
    },
  });
}
