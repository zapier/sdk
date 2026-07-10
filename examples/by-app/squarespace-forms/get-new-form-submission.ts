/**
 * SquarespaceConverted — Zapier SDK example.
 * Retrieve a new form submission from a Squarespace form.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "squarespace-forms", owner: "me" });
  return zapier.apps["squarespace-forms"]({ connection: connection.id });
}

/**
 * New Form Submission
 * Triggers when form submission is submitted.
 */
export async function getNewFormSubmission() {
  const squarespaceForms = await connect();
  await squarespaceForms.read.form_submission_v1({
    inputs: {
      // no inputs
    },
  });
}
