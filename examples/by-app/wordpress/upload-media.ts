/**
 * WordPress — Zapier SDK example.
 * Upload an image with a caption to the WordPress media library.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "wordpress", owner: "me" });
  return zapier.apps.wordpress({ connection: connection.id });
}

/**
 * Upload Media
 * Upload a new media file, which can be used as featured media.
 */
export async function uploadMedia() {
  const wordpress = await connect();
  await wordpress.write.media({
    inputs: {
      file: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", // required
      filename: "mountain-view.jpg", // optional — Provide a filename with the file extension. Note that spaces in the filename are changed to hyphe...
      title: "Mountain View", // optional
      caption: "A breathtaking view from the top of the mountain.", // optional — Uses the WordPress Text Editor which supports HTML.
      description: "Photo taken during a hiking trip in the Alps.", // optional — Uses the WordPress Text Editor which supports HTML.
      alt_text: "Mountain landscape with clouds", // optional — Alternative text to display when attachment is not displayed.
      comment_status: "open", // optional — choices: open, closed — Whether or not comments are open on the media.
      ping_status: "open", // optional — choices: open, closed — Whether or not the media can be pinged.
    },
  });
}
