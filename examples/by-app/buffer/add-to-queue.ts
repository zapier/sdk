/**
 * Buffer — Zapier SDK example.
 * Add an item to the Buffer publishing queue.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "buffer", owner: "me" });
  return zapier.apps.buffer({ connection: connection.id });
}

/**
 * Add to Queue
 * Add an item to your queue or send an update immediately to any of your Buffer channels.
 */
export async function addToQueue() {
  const buffer = await connect();
  await buffer.write.update({
    inputs: {
      method: "https://www.example.com/blog/launch-announcement", // required — default "queue" — choices: queue, schedule, share_next, share_now, draft, schedule_draft — Select which share option you wish to use.
    },
  });
}
