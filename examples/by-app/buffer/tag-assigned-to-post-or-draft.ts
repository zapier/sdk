/**
 * Buffer — Zapier SDK example.
 * List tags assigned to a Buffer post or draft, filtered by status.
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
 * Tag Assigned to a Post or Draft
 * Triggers when a tag is assigned to post or draft.
 */
export async function tagAssignedToPostOrDraft() {
  const buffer = await connect();
  await buffer.read.tagAssignedToPost({
    inputs: {
      status: "pending", // optional — choices: scheduled, sent, draft, draft_pending — Want to filter on a specific post status?
    },
  });
}
