/**
 * OneDrive — Zapier SDK example.
 * Find a file in OneDrive by searching for its name or content.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "onedrive", owner: "me" });
  return zapier.apps.onedrive({ connection: connection.id });
}

/**
 * Find File
 * Search for files by name, content, or metadata.
 */
export async function findFile() {
  const onedrive = await connect();
  await onedrive.search.file({
    inputs: {
      query: "Q2 Marketing Plan", // required — Enter the text to search for in file names and metadata.
    },
  });
}
