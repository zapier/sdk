/**
 * YouTube — Zapier SDK example.
 * Upload a new video to YouTube.
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
 * Upload Video
 * Post a video to your channel
 */
export async function uploadVideo() {
  const youtube = await connect();
  await youtube.write.upload_video({
    inputs: {
      title: "How to Make Sourdough Bread", // required
      description: "A step-by-step guide to making sourdough bread at home.", // required
      video: "/files/videos/sourdough-bread.mp4", // required
      thumbnail: "/files/images/sourdough-thumbnail.jpg", // optional — Thumbnail for the video.
      privacy_status: "public", // optional — choices: private, public, unlisted
      publish_at: "2024-07-10T15:00:00Z", // optional — Only available to YouTube Partner accounts. If you set this, the Privacy Status must be set to "p...
      default_language: "en", // optional — Default language for the video content (e.g., "en", "es", "fr")
      default_audio_language: "en", // optional — Default language of the audio track (e.g., "en", "es", "fr")
      license: "youtube", // optional — default "youtube" — choices: youtube, creativeCommon — License for the video content
      embeddable: true, // optional — default true — Whether the video can be embedded on other websites
      public_stats_viewable: true, // optional — default true — Whether the video statistics (view count, etc.) are publicly visible
      made_for_kids: false, // optional
      notify_subscribers: true, // optional — default true
    },
  });
}
