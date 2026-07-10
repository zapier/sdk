/**
 * Notion — Zapier SDK example.
 * Create a new Notion page with a title, content, icon, and cover image.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "notion", owner: "me" });
  return zapier.apps.notion({ connection: connection.id });
}

/**
 * Create Page
 * Creates a Page inside a parent page
 */
export async function createPage() {
  const notion = await connect();
  await notion.write.create_page({
    inputs: {
      title: "Q2 Planning", // optional — This field has a 2000 character limit. Any characters beyond 2000 will not be included.
      content: "## Goals\n- Increase revenue by 20%\n- Launch new product line", // optional — The text to add to to the page body. Supports markdown.
      icon: "📄", // optional — Use an emoji to set as the Page Icon. Example: 📝
      cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // optional — Use a publicly accessible image URL to set as the Page Cover. The URL must be publicly accessible...
    },
  });
}
