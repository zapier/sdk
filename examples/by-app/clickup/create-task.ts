/**
 * ClickUp — Zapier SDK example.
 * Create a new task in ClickUp.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "clickup", owner: "me" });
  return zapier.apps.clickup({ connection: connection.id });
}

/**
 * Create Task
 * Creates a new task.
 */
export async function createTask() {
  const clickup = await connect();
  await clickup.write.task({
    inputs: {
      name: "Draft Q2 Marketing Plan", // required
      content: "Outline key strategies for Q2 growth and assign initial tasks.", // optional
      markdown: true, // optional — default true — Is the description rich text (markdown or HTML)?
      priority: "high", // optional — choices: 1, 2, 3, 4 — If your Space has Priorities enabled, you can specify a Priority.
      start_date: "2024-07-01", // optional — The time you set here will be automatically converted to your ClickUp Workspace’s time zone.
      due_date: "2024-07-15", // optional — The time you set here will be automatically converted to your ClickUp Workspace’s time zone.
    },
  });
}
