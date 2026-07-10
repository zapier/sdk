/**
 * MicrosoftOutlook — Zapier SDK example.
 * Find emails matching a specific search query.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "microsoft-outlook", owner: "me" });
  return zapier.apps["microsoft-outlook"]({ connection: connection.id });
}

/**
 * Find Emails
 * Finds emails based on name.
 */
export async function findEmail() {
  const microsoftOutlook = await connect();
  await microsoftOutlook.search.find_email({
    inputs: {
      searchValue: "from:ceo@company.com subject:Strategy Meeting", // required — The value to search for.
    },
  });
}
