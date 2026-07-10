/**
 * ChatGPT — Zapier SDK example.
 * Retrieve a specific ChatGPT response using its response ID.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "chatgpt", owner: "me" });
  return zapier.apps.chatgpt({ connection: connection.id });
}

/**
 * Find Response
 * Find a stored Responses API result by response ID for audit trails and debugging.
 */
export async function findResponse() {
  const chatgpt = await connect();
  await chatgpt.search.find_response({
    inputs: {
      response_id: "resp_1234567890abcdef", // required — The ID of the response to retrieve from the Responses API.
    },
  });
}
