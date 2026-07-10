/**
 * ActiveCampaign — Zapier SDK example.
 * Create an account with a name and optional URL.
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
 * Create Account
 * Creates a new account.
 */
export async function createAccount() {
  const activecampaign = await connect();
  await activecampaign.write.account_add({
    inputs: {
      name: "Acme Corporation", // required
      account_url: "https://acme-corp.com", // optional — Suggested Format: `https://www.example.com`
    },
  });
}
