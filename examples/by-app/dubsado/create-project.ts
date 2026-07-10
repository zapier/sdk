/**
 * Dubsado — Zapier SDK example.
 * Create a new project for a client.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "dubsado", owner: "me" });
  return zapier.apps.dubsado({ connection: connection.id });
}

/**
 * Create Project
 * Creates a new project.
 */
export async function createProject() {
  const dubsado = await connect();
  await dubsado.write.create_project({
    inputs: {
      projectLocation__name: "Acme Corp HQ", // optional — The name of the created project's location.
      projectLocation__line1: "123 Main St", // optional — The address for the created project's location.
      projectLocation__city: "San Francisco", // optional — The address for the created project's location.
      projectLocation__state: "CA", // optional — The address for the created project's location.
      title: "Brand Refresh for Acme Corp", // required — The title of the created project.
      client__email: "jane.doe@acmecorp.com", // required — The client's email address.
    },
  });
}
