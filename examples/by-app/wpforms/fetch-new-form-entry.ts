/**
 * WPForms — Zapier SDK example.
 * Fetch a new entry submitted through a WPForms form.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "wpforms", owner: "me" });
  return zapier.apps.wpforms({ connection: connection.id });
}

/**
 * New Form Entry
 * Triggers when a form entry is submitted.
 */
export async function fetchNewFormEntry() {
  const wpforms = await connect();
  await wpforms.read.entry({
    inputs: {
      form_id: "12345", // required, dynamic
    },
  });
}
