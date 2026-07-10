/**
 * Trello — Zapier SDK example.
 * Find a card using a custom search query.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "trello", owner: "me" });
  return zapier.apps.trello({ connection: connection.id });
}

/**
 * Find Card by Custom Query
 * Search for cards using a custom Trello query string.
 */
export async function findCardByCustomQuery() {
  const trello = await connect();
  await trello.search.organization_card_custom_query({
    inputs: {
      query: "label:Urgent list:'To Do' due:week", // required — Enter a Trello query string directly (e.g., "board:MyBoard @me due:week"). You can copy this from...
      cards_limit: 50, // optional — default 50 — Maximum number of cards to return (default: 50, max: 1000).
    },
  });
}
