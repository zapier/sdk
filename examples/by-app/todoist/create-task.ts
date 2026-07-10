/**
 * Todoist — Zapier SDK example.
 * Create a new task in Todoist.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "todoist", owner: "me" });
  return zapier.apps.todoist({ connection: connection.id });
}

/**
 * Create Task
 * Creates a new task.
 */
export async function createTask() {
  const todoist = await connect();
  await todoist.write.new_task({
    inputs: {
      content: "Draft Q3 OKRs", // required
      note: "Discuss with leadership before finalizing.", // optional — Use this to store additional extra text for this task. A note can be unlimited in size.
      date_string: "tomorrow at 9am", // optional — Supports human readable dates like "today" or "next friday". [Read full datetime help here.](http...
      priority: 1, // optional — default 1 — choices: 1, 2, 3, 4 — The priority of the task (this is usually a number between 1 and 4).
    },
  });
}
