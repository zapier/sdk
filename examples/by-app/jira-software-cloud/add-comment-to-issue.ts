/**
 * JiraSoftwareCloud — Zapier SDK example.
 * Add a comment to a Jira issue.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "jira-software-cloud", owner: "me" });
  return zapier.apps["jira-software-cloud"]({ connection: connection.id });
}

/**
 * Add Comment to Issue
 * Adds a new comment to an issue.
 */
export async function addCommentToIssue() {
  const jiraSoftwareCloud = await connect();
  await jiraSoftwareCloud.write.add_comment({
    inputs: {
      comment: "This bug needs urgent attention. Please review ASAP!", // required — Jira supports Wiki Markup formatting for comments. For information about the syntax, see [Wiki Ma...
    },
  });
}
