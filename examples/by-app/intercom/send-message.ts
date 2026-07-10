/**
 * Intercom — Zapier SDK example.
 * Send a message to a user by email.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "intercom", owner: "me" });
  return zapier.apps.intercom({ connection: connection.id });
}

/**
 * Send Incoming Message
 * Send a Message from a Contact into Intercom to create a new Conversation. Note: you must have a valid plan on Intercom to access this action.
 */
export async function sendMessage() {
  const intercom = await connect();
  await intercom.write.send_message({
    inputs: {
      contact_identifier: "email", // optional — choices: email, id — How should we identify the Contact? Defaults to "email" if left blank.
      email: "jane.doe@example.com", // required
      body: "Hi Jane, just checking in to see how you are enjoying our service!", // required
    },
  });
}
