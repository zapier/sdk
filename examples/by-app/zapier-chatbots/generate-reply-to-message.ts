/**
 * Chatbots — Zapier SDK example.
 * Generate a reply to a user message in a chatbot conversation.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "zapier-chatbots", owner: "me" });
  return zapier.apps["zapier-chatbots"]({ connection: connection.id });
}

/**
 * Generate Reply to Message
 * Generates a new message reply from a Zapier Chatbot
 */
export async function generateReplyToMessage() {
  const zapierChatbots = await connect();
  await zapierChatbots.write.chatbot_response({
    inputs: {
      conversationKey: "support-chat-2024", // optional — Unique key to associate to this Chatbot conversation, such as a session ID, or user email address...
      message: "How can I reset my password?", // required — Message to send to the Chatbot to generate a reply from.
    },
  });
}
