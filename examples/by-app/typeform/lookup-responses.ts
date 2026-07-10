/**
 * Typeform — Zapier SDK example.
 * Find form responses matching a specific query or within a given date range.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "typeform", owner: "me" });
  return zapier.apps.typeform({ connection: connection.id });
}

/**
 * Lookup Responses
 * Looks up responses for a given criteria.
 */
export async function lookupResponses() {
  const typeform = await connect();
  await typeform.search.lookup_responses({
    inputs: {
      since: "2024-05-01T00:00:00Z", // optional — Limit request to responses submitted since the specified date and time. Could be passed as int (t...
      until: "2024-06-01T00:00:00Z", // optional — Limit request to responses submitted until the specified date and time. Could be passed as int (t...
      query: "email:customer@example.com", // optional
      complete: false, // optional
    },
  });
}
