/**
 * Skool — Zapier SDK example.
 * Invite a new member to a Skool group.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "skool", owner: "me" });
  return zapier.apps.skool({ connection: connection.id });
}

/**
 * Invite Member
 * Invites a Member to your group
 */
export async function inviteMember() {
  const skool = await connect();
  await skool.write.invite_member({
    inputs: {
      email: "jane.doe@gmail.com", // required — Enter an email address of the person you would like to invite.
    },
  });
}
