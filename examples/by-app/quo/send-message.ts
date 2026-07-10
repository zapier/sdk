/**
 * OpenPhone — Zapier SDK example.
 * Send a message to a phone number.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "quo", owner: "me" });
  return zapier.apps.quo({ connection: connection.id });
}

/**
 * Send a Message
 * Sends a new message via Quo.
 */
export async function sendMessage() {
  const quo = await connect();
  await quo.write.send_message({
    inputs: {
      to: "+14155551234", // required — The phone number this message should be sent to.
      body: "Hi, this is your appointment reminder for 3 PM today. Please reply to confirm.", // required — Messages sent via Zapier must adhere to Quo's [Messaging Policy](https://www.quo.com/terms).
      mark_as_done: false, // optional — default false — Moves the conversation to done when the message is sent.
    },
  });
}
