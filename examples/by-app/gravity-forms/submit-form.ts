/**
 * GravityForms — Zapier SDK example.
 * Submit a new response to a form.
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
 * Submit Form
 * Creates an entry and fires all events associated with a form submission such as notifications and add-on feeds.
 */
export async function submitForm() {
  const gravityForms = await connect();
  await gravityForms.write.createFormSubmission({
    inputs: {
      // no inputs
    },
  });
}
