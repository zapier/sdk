/**
 * YouTube — Zapier SDK example.
 * Search for a video matching a specific query.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "youtube", owner: "me" });
  return zapier.apps.youtube({ connection: connection.id });
}

/**
 * Find Video
 * Search for videos on YouTube using various criteria like keywords, channel, date range, and more.
 */
export async function findVideo() {
  const youtube = await connect();
  await youtube.search.find_video({
    inputs: {
      query: "sourdough bread recipe", // optional — Search for videos that match this query. Leave empty to search all videos.
      order: "relevance", // optional — default "relevance" — choices: relevance, date, rating, title, videoCount, viewCount — How to order the search results.
      published_after: "2024-01-01T00:00:00Z", // optional — Only return videos published after this date and time.
      published_before: "2024-06-01T00:00:00Z", // optional — Only return videos published before this date and time.
      video_duration: "any", // optional — choices: any, short, medium, long — Filter videos by duration.
      video_definition: "any", // optional — choices: any, high, standard — Filter by video quality.
      video_dimension: "any", // optional — choices: any, 2d, 3d — Filter by video dimension.
      video_caption: "any", // optional — choices: any, closedCaption, none — Filter by caption availability.
      video_license: "any", // optional — choices: any, youtube, creativeCommon — Filter by video license.
      safe_search: "moderate", // optional — default "moderate" — choices: moderate, none, strict — Filter search results for inappropriate content.
      max_results: 25, // optional — default 25 — Maximum number of results to return (1-50).
    },
  });
}
