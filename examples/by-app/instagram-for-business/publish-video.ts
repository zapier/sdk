/**
 * InstagramBusiness — Zapier SDK example.
 * Publish a video to your Instagram for Business account.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "instagram-for-business", owner: "me" });
  return zapier.apps["instagram-for-business"]({ connection: connection.id });
}

/**
 * Publish Video
 * Publish a video to your Instagram feed as a Reel. **Note**: This will only work for an Instagram Business Account and not a Personal or Creator Account.
 */
export async function publishVideo() {
  const instagramForBusiness = await connect();
  await instagramForBusiness.write.publish_video({
    inputs: {
      video: "https://example.com/videos/launch-announcement.mp4", // required — The video to be posted. Can be an actual file or a public URL. For URLs, they must start with `ht...
      caption: "Launching our new product today! #launchday", // optional — Captions can be up to 2,200 characters and can include emoji, hashtags, and line breaks.
      location: "New York, NY", // optional — Name of the location. Please be as explicit as possible, we'll do our best to find a match.
    },
  });
}
