/**
 * GoogleForms — Zapier SDK example.
 * Fetch new or updated responses from a Google Form.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "google-forms", owner: "me" });
  return zapier.apps["google-forms"]({ connection: connection.id });
}

/**
 * New or Updated Form Response
 * Triggers when a form response is added or modified.
 */
export async function getUpdatedFormResponse() {
  const googleForms = await connect();
  await googleForms.read.updated_form_response({
    inputs: {
      // no inputs
    },
  });
}
