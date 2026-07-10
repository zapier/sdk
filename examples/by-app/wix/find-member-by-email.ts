/**
 * WixAutomations — Zapier SDK example.
 * Find a member by email address.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "wix", owner: "me" });
  return zapier.apps.wix({ connection: connection.id });
}

/**
 * Members and Contacts
 * Triggers when contacts are created, group status changes, or on post activity.
 */
export async function findMemberByEmail() {
  const wix = await connect();
  await wix.read.k148C2287C669D849D153463C7486A694({
    inputs: {
      z_members_and_contacts_selected_trigger_type: "Find Member by Email", // required — default "z_contact_assigned_contacts" — choices: z_contact_assigned_contacts, z_group_create_request_declined_wix_groups, z_group_has_new_member_generic_update_wix_groups, z_group_request_approved_de_wix_groups, z_group_request_rejected_de_wix_groups, z_group_updated_wix_groups, +43 more — The relevant Wix app must be installed on your site for the Zap to work.
    },
  });
}
