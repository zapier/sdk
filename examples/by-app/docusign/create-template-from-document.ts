/**
 * Docusign — Zapier SDK example.
 * Create a reusable template from an uploaded document.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "docusign", owner: "me" });
  return zapier.apps.docusign({ connection: connection.id });
}

/**
 * Create Template From Document
 * Creates a new template using a document.
 */
export async function createTemplateFromDocument() {
  const docusign = await connect();
  await docusign.write.create_template_from_document({
    inputs: {
      templateName: "NDA Template", // required — Enter a name for the template
      templateDescription: "Standard NDA for contractors", // optional — Enter a description for the template
      emailSubject: "Please sign the NDA", // optional — Subject line of the email that will be sent to signers
      emailBlurb: "Hi, please review and sign the attached NDA document.", // optional — Custom message to include in the signing email
    },
  });
}
