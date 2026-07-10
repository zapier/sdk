/**
 * Chatbots — Zapier SDK example.
 * Retrieve data when a specific chatbot button is clicked.
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
 * Chatbot Button Click
 * Triggers when a chatbot button is clicked.
 */
export async function chatbotButtonClick() {
  const zapierChatbots = await connect();
  await zapierChatbots.read.button_click({
    inputs: {
      // no inputs
    },
  });
}
