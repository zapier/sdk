/**
 * ChatGPT — Zapier SDK example.
 * Start or continue a conversation with ChatGPT and receive a response.
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
 * Conversation
 * (Recommended) Send a chat to OpenAI, optionally storing messages for continuous conversation. This enhanced action can also help with web search, file search, and advanced tooling such as MCP. Powered by Responses API.
 */
export async function conversation() {
  const chatgpt = await connect();
  await chatgpt.write.conversation_responses_api({
    inputs: {
      model: "gpt-4o", // required, dynamic — default "gpt-4o" — GPT-4o not available? **[Learn how](https://help.openai.com/en/articles/7102672-how-can-i-access-...
      user_message: "What's the weather in Paris this weekend?", // required — Message to send as input to the model.
      instructions: "Answer as a travel assistant.", // optional — Inserts a system (or developer) message as the first item in the models context. This is useful f...
      use_prompt_template: false, // optional — Enable to use a saved prompt template from your OpenAI account. When enabled, the prompt template...
      max_tokens: 2000, // optional — default 2000 — The maximum number of tokens to generate in the output. Different models may have different total...
      tool_choice: "auto", // optional — default "auto" — choices: auto, none — Controls whether the model can use tools. "Auto" allows the model to choose, "None" forces messag...
      parallel_tool_calls: true, // optional — default true — Allow the model to run multiple tool calls in parallel. When enabled, the model can call multiple...
      max_tool_calls: 5, // optional — default 5 — Maximum number of total tool calls allowed in a single response. This limit applies across all to...
      response_format: "text", // optional — default "text" — choices: text, json_schema, json_object — Format of the response. JSON Schema is recommended for structured outputs as it ensures strict ad...
    },
  });
}
