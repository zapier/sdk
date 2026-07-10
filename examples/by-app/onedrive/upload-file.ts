/**
 * OneDrive — Zapier SDK example.
 * Upload a file to OneDrive.
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
 * Upload File
 * Upload a file.
 */
export async function uploadFile() {
  const onedrive = await connect();
  await onedrive.write.file({
    inputs: {
      file: "/Users/alex/Documents/marketing-plan.pdf", // required — Select the file to upload.
      name: "Q2 Marketing Plan.pdf", // optional — Optional: Rename the file when uploading. Leave blank to keep the original filename.
    },
  });
}
