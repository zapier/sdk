/**
 * Anthropic — Zapier SDK example.
 * Send a conversational message to Claude and receive its AI-generated response.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "anthropic-claude", owner: "me" });
  return zapier.apps["anthropic-claude"]({ connection: connection.id });
}

/**
 * Send Message
 * Sends a message to Claude and the model generates the next message in the conversation, storing the messages as you go.
 */
export async function sendMessage() {
  const anthropicClaude = await connect();
  await anthropicClaude.write.create_message({
    inputs: {
      user_message: "Summarize the key findings from the attached market research report.", // required — This is the most recent message that the assistant will respond to. Do not exceed the token count...
      system: "You are a helpful assistant for business analysts.", // optional — This is a way of providing context and instructions to Claude, such as specifying a particular go...
      memory_key: "market-research-session-2024", // optional — If provided, this unique value will allow the assistant to continue this conversation. We recomme...
      advanced: false, // optional
    },
  });
}
