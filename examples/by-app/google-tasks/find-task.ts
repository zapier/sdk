/**
 * GoogleTasks — Zapier SDK example.
 * Find a task by its title in Google Tasks.
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
 * Find Task
 * Searches for an incomplete task.
 */
export async function findTask() {
  const googleTasks = await connect();
  await googleTasks.search.find_task({
    inputs: {
      title: "Book flights for conference", // required
    },
  });
}
