/**
 * ActiveCampaign — Zapier SDK example.
 * Find an account by name.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "activecampaign", owner: "me" });
  return zapier.apps.activecampaign({ connection: connection.id });
}

/**
 * Find Account
 * Finds account by name.
 */
export async function findAccount() {
  const activecampaign = await connect();
  await activecampaign.search.find_account({
    inputs: {
      name: "Acme Corporation", // required
    },
  });
}
