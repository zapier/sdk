/**
 * Sendinbluev2 — Zapier SDK example.
 * Detect when a transactional email has been opened.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "brevo", owner: "me" });
  return zapier.apps.brevo({ connection: connection.id });
}

/**
 * Transactional Email Opened
 * Triggers when a Brevo transactional email is opened.
 */
export async function transactionalEmailOpened() {
  const brevo = await connect();
  await brevo.read.emailTsOpened({
    inputs: {
      webhookdesc: "Track customer engagement for order confirmation emails.", // optional — This trigger is initiated by a web-hook created in Brevo and this field will be used for the web-...
      getContactData: false, // optional — default false — By default this trigger returns only event data and contact's email address. If you need all cont...
    },
  });
}
