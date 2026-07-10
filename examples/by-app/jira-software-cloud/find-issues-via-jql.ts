/**
 * JiraSoftwareCloud — Zapier SDK example.
 * Find issues in Jira using a JQL query.
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
 * Find Issues (Via JQL)
 * Searches for issues using JQL.
 */
export async function findIssuesViaJql() {
  const jiraSoftwareCloud = await connect();
  await jiraSoftwareCloud.search.issue_jql({
    inputs: {
      jql: "project = DEMO AND status = 'To Do' AND assignee = currentUser()", // required — Enter a JQL query to filter issues based on specific criteria. [Learn more about JQL](https://con...
      maxResults: 50, // optional — default 50 — Maximum number of issues to return (1-500). Defaults to 50. Higher values may increase API respon...
    },
  });
}
