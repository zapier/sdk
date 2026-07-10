/**
 * GoogleHangoutsChat — Zapier SDK example.
 * Send a message to a Google Chat space.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "google-chat", owner: "me" });
  return zapier.apps["google-chat"]({ connection: connection.id });
}

/**
 * Create Message
 * Create a message in Hangouts Chat.
 */
export async function createMessage() {
  const googleChat = await connect();
  await googleChat.write.create_message({
    inputs: {
      title: "Team Update", // required
      imageUrl: "https://example.com/meeting.png", // optional
      subtitle: "Weekly Standup", // optional
      text: "Hello team, our next meeting is at 2:00 PM.", // required
      buttonText: "Join Meeting", // optional
      buttonUrl: "https://meet.google.com/xyz-meeting", // optional — Required if Action Button Text is used
    },
  });
}
