/**
 * MicrosoftOutlook — Zapier SDK example.
 * Send an email to one or more recipients with a specific subject and message.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "microsoft-outlook", owner: "me" });
  return zapier.apps["microsoft-outlook"]({ connection: connection.id });
}

/**
 * Send Email
 * Send an email from your Outlook account.
 */
export async function sendEmail() {
  const microsoftOutlook = await connect();
  await microsoftOutlook.write.send_email({
    inputs: {
      recipients: "bob@example.com, alice@example.com", // required
      subject: "Quarterly Report Submission", // required
      bodyFormat: "HTML", // required — choices: Text, HTML
      body: "<p>Hi team,<br>Please find attached the Q2 report.<br>Best,<br>John</p>", // required
      skipLargeFiles: "skip", // optional — choices: skip, error — Choose "Skip" to skip attaching a file if it is more than 150 MB, or "Error" to throw an error in...
    },
  });
}
