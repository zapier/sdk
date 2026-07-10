/**
 * Stripe — Zapier SDK example.
 * Find a customer by name or email.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "stripe", owner: "me" });
  return zapier.apps.stripe({ connection: connection.id });
}

/**
 * Find Customer
 * Finds an existing customer by their Stripe ID or email address.
 */
export async function findCustomer() {
  const stripe = await connect();
  await stripe.search.find_customer({
    inputs: {
      selection: "email", // optional — choices: id, email — Defaults to "Customer Stripe ID"
      query: "jane.doe@example.com", // required — Enter the Stripe ID (e.g. `cus_51kxW2Z0qQHpGc`) or the email address of the customer to find.
    },
  });
}
