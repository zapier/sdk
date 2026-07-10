/**
 * GitHub — Zapier SDK example.
 * Retrieve the contents of a file from a GitHub repository.
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
 * Get File Contents
 * Retrieves the content, SHA, and metadata of a file in a GitHub repository. Useful for fetching the SHA required to update an existing file. Note: decoded_content is UTF-8 text and will be lossy for binary files — use content (base64) or download_url for those.
 */
export async function getFileContents() {
  const github = await connect();
  await github.search.get_file_contents({
    inputs: {
      path: "src/components/LoginForm.tsx", // required — The path to the file within the repository (e.g., docs/README.md). If the path resolves to a dire...
    },
  });
}
