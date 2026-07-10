/**
 * GoogleDocs — Zapier SDK example.
 * Append text to the end of a Google Doc.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "google-docs", owner: "me" });
  return zapier.apps["google-docs"]({ connection: connection.id });
}

/**
 * Append Text to Document
 * Appends text to an existing document.
 */
export async function appendTextToDocument() {
  const googleDocs = await connect();
  await googleDocs.write.append({
    inputs: {
      folder: "root", // optional, dynamic — default "root" — Click the dropdown repeatedly to drill down into subfolders. Places at the top-level if none picked.
      text: "Summary of Q2 financial results: Revenue growth exceeded 15%.", // required — Note: this field also supports HTML which will be rendered into the document.
      newline: true, // optional — default true — When True, append text on a new line. If False, append text directly after the last character in ...
    },
  });
}
