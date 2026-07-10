/**
 * GravityForms — Zapier SDK example.
 * Retrieve a form submission by the form name.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "gravity-forms", owner: "me" });
  return zapier.apps["gravity-forms"]({ connection: connection.id });
}

/**
 * Form Submission
 * Triggers when the specified form is submitted.
 */
export async function getFormSubmission() {
  const gravityForms = await connect();
  await gravityForms.read.getEntry({
    inputs: {
      admin_labels: false, // optional
      feed_name: "Contact Us", // required — Please make up a unique name for this Zap and Form that Gravity Forms can use to know where to se...
    },
  });
}
