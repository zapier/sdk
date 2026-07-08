/**
 * Log an event to a Zapier Table.
 *
 * JTBD: Use Zapier Tables as a lightweight event log — no database to provision,
 * shareable with non-engineers, queryable from other Zaps and from the SDK.
 * App: Zapier Tables (write)
 * Run: npx tsx examples/by-app/zapier-tables/log-event.ts
 *
 * Tables uses first-class SDK methods (createTable, createTableRecords, etc.) —
 * these are documented in the SDK reference and don't need discovery.
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  const { data: tables } = await zapier.listTables({ search: "agent-events" });
  let eventsTable = tables[0];

  if (!eventsTable) {
    const created = await zapier.createTable({
      name: "agent-events",
      description: "Event log written by SDK examples and agents",
    });
    await zapier.createTableFields({
      table: created.data.id,
      fields: [
        { name: "event", type: "string" },
        { name: "actor", type: "string" },
        { name: "timestamp", type: "datetime" },
        { name: "metadata", type: "json" },
      ],
    });
    eventsTable = created.data;
  }

  // createTableRecords records are wrapped in { data: { ... } }.
  // keyMode: "names" addresses fields by their declared name (vs. internal id).
  await zapier.createTableRecords({
    table: eventsTable.id,
    keyMode: "names",
    records: [
      {
        data: {
          event: "agent.tool_call",
          actor: "claude-opus",
          timestamp: new Date().toISOString(),
          metadata: { tool: "send_discord_message", success: true },
        },
      },
    ],
  });
}

main().catch(console.error);
