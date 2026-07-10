/**
 * GitHub — Zapier SDK example.
 * Create a new issue in a GitHub repository.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "github", owner: "me" });
  return zapier.apps.github({ connection: connection.id });
}

/**
 * Create Issue
 * Create a new issue.
 */
export async function createIssue() {
  const github = await connect();
  await github.write.issue({
    inputs: {
      title: "Fix authentication bug", // required
      body: "Users are unable to log in with Google accounts since the last release. Please investigate and resolve.", // optional
    },
  });
}
