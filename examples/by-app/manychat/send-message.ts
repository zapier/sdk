/**
 * ManyChat — Zapier SDK example.
 * Send a text message to a ManyChat user.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "manychat", owner: "me" });
  return zapier.apps.manychat({ connection: connection.id });
}

/**
 * Send Text Message to User
 * Sends a message to a user.
 */
export async function sendMessage() {
  const manychat = await connect();
  await manychat.write.send_message({
    inputs: {
      message_tag: "POST_PURCHASE_UPDATE", // optional — choices: ACCOUNT_UPDATE, CONFIRMED_EVENT_UPDATE, POST_PURCHASE_UPDATE — Select message tag. [Read about tags](https://support.manychat.com/support/solutions/articles/360...
      text: "Your package has shipped! Track it here: https://trackmypackage.com/1234", // required
    },
  });
}
