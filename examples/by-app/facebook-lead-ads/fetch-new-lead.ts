/**
 * FacebookLeads — Zapier SDK example.
 * Retrieve new leads from Facebook Lead Ads.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "facebook-lead-ads", owner: "me" });
  return zapier.apps["facebook-lead-ads"]({ connection: connection.id });
}

/**
 * New Lead
 * Triggers when a new lead is created.
 */
export async function fetchNewLead() {
  const facebookLeadAds = await connect();
  await facebookLeadAds.read.lead({
    inputs: {
      // no inputs
    },
  });
}
