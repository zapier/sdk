/**
 * GoogleDrive — Zapier SDK example.
 * Retrieve a file or folder from Google Drive by its ID.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "google-drive", owner: "me" });
  return zapier.apps["google-drive"]({ connection: connection.id });
}

/**
 * Retrieve File or Folder by ID
 * Get a file or folder by its ID.
 */
export async function retrieveFileOrFolderById() {
  const googleDrive = await connect();
  await googleDrive.search.file_or_folder_by_id({
    inputs: {
      id: "1a2b3c4d5e6f7g8h9i0j", // required — Use another step to make available the ID of the file or folder you want to retrieve.
    },
  });
}
