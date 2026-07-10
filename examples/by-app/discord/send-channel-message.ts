/**
 * Discord — Zapier SDK example.
 * Send a message to a Discord channel.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "discord", owner: "me" });
  return zapier.apps.discord({ connection: connection.id });
}

/**
 * Send Channel Message
 * Post a new message to a specific #channel you choose.
 */
export async function sendChannelMessage() {
  const discord = await connect();
  await discord.write.send_channel_message({
    inputs: {
      content: "Hello from Zapier!", // required — Must be less than 2000 characters. For mentions, see [Discord Formatting Help](https://zapier.com...
      ping_usernames: false, // optional — Users, roles and everyone/here mentions will be pinged if you choose true.
      tts: false, // optional — Choose if text-to-speech is enabled
      username: "Zapier Bot", // optional — Must be between 1 and 80 characters in length. Defaults to "Zapier".
      avatar_url: "https://cdn.zapier.com/zapier-avatar.png", // optional — Must be the full URL of an image, like `https://example.com/my-image.png`. Defaults to the Zapier...
    },
  });
}
