/**
 * Anthropic — Zapier SDK example.
 * Upload a document for use in Claude conversations or analysis.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "anthropic-claude", owner: "me" });
  return zapier.apps["anthropic-claude"]({ connection: connection.id });
}

/**
 * Upload File
 * Upload a file to Anthropic
 */
export async function uploadFile() {
  const anthropicClaude = await connect();
  await anthropicClaude.write.upload_file({
    inputs: {
      file: "/files/reports/market-research-q2-2024.pdf", // required — The file to upload (e.g., PDF document)
    },
  });
}
