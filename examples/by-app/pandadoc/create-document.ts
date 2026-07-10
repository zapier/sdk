/**
 * PandaDoc — Zapier SDK example.
 * Create and optionally send a PandaDoc document.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "pandadoc", owner: "me" });
  return zapier.apps.pandadoc({ connection: connection.id });
}

/**
 * Create Document
 * Create a document from a template.
 */
export async function createDocument() {
  const pandadoc = await connect();
  await pandadoc.write.create_document({
    inputs: {
      doc_name: "Sales Proposal Q2 2024", // required
      send: true, // required — default true — Do you want to send the document to your recipient(s)?
      message: "Please review and sign this proposal.", // optional — Message body for your email.
      currency: "USD", // optional — default "USD" — choices: AED, AFN, ALL, AMD, AOA, ARS, +122 more — Select a currency for the pricing table.
    },
  });
}
