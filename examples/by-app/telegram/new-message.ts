/**
 * Telegram — Zapier SDK example.
 * Get notified when a new message is received in a Telegram chat.
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
 * New Message
 * Triggers instantly when a new message is received by your bot via webhook.
 */
export async function newMessage() {
  const telegram = await connect();
  await telegram.read.new_message({
    inputs: {
      message_type: "text", // optional — default "exclude_voice_audio" — choices: all, voice_audio, exclude_voice_audio — Choose which messages trigger this Zap. Defaults to messages that are not voice notes or audio fi...
    },
  });
}
