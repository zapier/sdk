/**
 * Typeform — Zapier SDK example.
 * Create an empty Typeform form with a specified title.
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
 * Create an Empty Form
 * Creates a new empty form.
 */
export async function createEmptyForm() {
  const typeform = await connect();
  await typeform.write.create_form({
    inputs: {
      title: "Customer Satisfaction Survey", // required
    },
  });
}
