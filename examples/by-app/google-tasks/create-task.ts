/**
 * GoogleTasks — Zapier SDK example.
 * Create a new task in a Google Tasks list.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "google-tasks", owner: "me" });
  return zapier.apps["google-tasks"]({ connection: connection.id });
}

/**
 * Create Task
 * Creates a new task.
 */
export async function createTask() {
  const googleTasks = await connect();
  await googleTasks.write.task({
    inputs: {
      title: "Book flights for conference", // required
      notes: "Compare prices on Delta and United", // optional
      due: "2024-06-15T17:00:00Z", // optional
    },
  });
}
