/**
 * ZohoCRM — Zapier SDK example.
 * Add an attachment file to a record in Zoho CRM.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "zoho-crm", owner: "me" });
  return zapier.apps["zoho-crm"]({ connection: connection.id });
}

/**
 * Add Attachment
 * Add attachment to the selected Module entry
 */
export async function addAttachment() {
  const zohoCrm = await connect();
  await zohoCrm.write.add_attachment({
    inputs: {
      file_name: "Signed_Contract_2024.pdf", // optional
      attachment_file: "/Users/alex/Documents/contract.pdf", // required
    },
  });
}
