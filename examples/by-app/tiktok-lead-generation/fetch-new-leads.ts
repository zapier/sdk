/**
 * TikTokLeadGeneration — Zapier SDK example.
 * Fetch new leads from a specified TikTok lead source.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "tiktok-lead-generation", owner: "me" });
  return zapier.apps["tiktok-lead-generation"]({ connection: connection.id });
}

/**
 * New Lead
 * Triggers when a new lead is created.
 */
export async function fetchNewLeads() {
  const tiktokLeadGeneration = await connect();
  await tiktokLeadGeneration.read.new_leads_integration({
    inputs: {
      lead_source: "TikTok Lead Form - Summer Campaign", // required — choices: INSTANT_FORM, DIRECT_MESSAGE
    },
  });
}
