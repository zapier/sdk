/**
 * DropBox — Zapier SDK example.
 * Upload a file to Dropbox.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "dropbox", owner: "me" });
  return zapier.apps.dropbox({ connection: connection.id });
}

/**
 * Upload File
 * Upload an existing file or attachment not bigger than 500 MB.
 */
export async function uploadFile() {
  const dropbox = await connect();
  await dropbox.write.file({
    inputs: {
      directory: "/", // required, dynamic — default "/" — Where to save the file.
      file: "/Users/alex/Documents/ProjectProposal.pdf", // required — Must be a file object from another service (or some URL).
      overwrite: false, // optional — Whether we should overwrite this file (if one of the same name exists) or not.
      new_name: "ProjectProposal_Final.pdf", // optional — Advanced: By default, we use the same name as the file from the trigger. If you need to change th...
      new_extension: "pdf", // optional — Advanced: If you specify a file name, you can also specify an extension (include the initial ".").
      include_sharing_link: true, // optional — default true — If false, a sharing link will not be included in the output.
    },
  });
}
