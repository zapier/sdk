/**
 * GoogleDrive — Zapier SDK example.
 * Upload a file to Google Drive.
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
 * Upload File
 * Copies an existing file from another service to Google Drive.
 */
export async function uploadFile() {
  const googleDrive = await connect();
  await googleDrive.write.file({
    inputs: {
      file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // required — A file to be uploaded. Can be an actual file or a public URL. See this [help doc](http://zpr.io/P...
      convert: false, // optional — If yes, we will tell Google to convert this into an editable document.
      new_name: "Q2 Budget Report.pdf", // optional — By default, we use the same name and extension as the original file.
      new_extension: "pdf", // optional — Advanced: Can only be used if you also specify a file name. Do not include the . in front of the ...
      idempotency_key: "upload-20240601-01", // optional
    },
  });
}
