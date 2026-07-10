/**
 * GoogleMail — Zapier SDK example.
 * Send an email to one or more recipients.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "gmail", owner: "me" });
  return zapier.apps.gmail({ connection: connection.id });
}

/**
 * Send Email
 * Create and send a new email message.
 */
export async function sendEmail() {
  const gmail = await connect();
  await gmail.write.message({
    inputs: {
      from_name: "Jane Smith", // optional — Customize the sender's name.
      reply_to: "jane.smith@company.com", // optional — Specify a single reply address other than your own.
      subject: "Quarterly Update", // required
      body_type: "plain", // optional — default "plain" — choices: plain, html — Choose to format the body with [HTML](https://www.w3schools.com/html/) or use plain text.
      body: "Hello team,\n\nPlease find attached the quarterly update.\n\nBest regards,\nJane", // required
      signature_delimiter: true, // optional — default true — Include the standard "--" delimiter before the signature.
      send_to_groups: false, // optional — default false — If you want to send the message to a Google Contacts Group/Label, select this option.
    },
  });
}
