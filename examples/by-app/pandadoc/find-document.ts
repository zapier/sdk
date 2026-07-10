/**
 * PandaDoc — Zapier SDK example.
 * Search for PandaDoc documents by query or status.
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
 * Find Document
 * Find a document by name, status, and other parameters.
 */
export async function findDocument() {
  const pandadoc = await connect();
  await pandadoc.search.find_document({
    inputs: {
      query: "Sales Proposal Q2 2024", // optional
      status: "sent", // optional — choices: document.draft, document.waiting_approval, document.approved, document.rejected, document.sent, document.viewed, +6 more
    },
  });
}
