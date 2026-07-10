/**
 * Telegram — Zapier SDK example.
 * Send a text message to a Telegram chat.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "telegram", owner: "me" });
  return zapier.apps.telegram({ connection: connection.id });
}

/**
 * Send Message
 * Sends a message from your bot.
 */
export async function sendMessage() {
  const telegram = await connect();
  await telegram.write.send_message({
    inputs: {
      format: "plaintext", // optional — choices: plaintext, html, markdown — HTML and Markdown formats are limited to 4096 characters. Plain Text messages over 4096 character...
      text: "Welcome to the group! Please read the rules.", // required
      disable_link_preview: false, // optional — default false — Set to Yes if you want to disable link previews in your Telegram messages.
    },
  });
}
