/**
 * MSTodo — Zapier SDK example.
 * Find an existing task by title keyword.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "microsoft-todo", owner: "me" });
  return zapier.apps["microsoft-todo"]({ connection: connection.id });
}

/**
 * Find a Task
 * Search for a Task.
 */
export async function findTask() {
  const microsoftTodo = await connect();
  await microsoftTodo.search.find_task({
    inputs: {
      title: "Budget Report", // optional — The title of the task.
      include_completed_tasks: false, // optional — default false — Choose whether to include "completed" tasks in your search results. If left blank, completed task...
    },
  });
}
