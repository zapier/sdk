/**
 * Dubsado — Zapier SDK example.
 * Create a new project for a client at a specific location.
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
export async function createProjectWithLocation() {
  const dubsado = await connect();
  await dubsado.write.create_project({
    inputs: {
      projectLocation__name: "WebCo Main Office", // optional — The name of the created project's location.
      projectLocation__line1: "456 Oak Ave", // optional — The address for the created project's location.
      projectLocation__line2: "Suite 200", // optional — The address for the created project's location.
      projectLocation__city: "Los Angeles", // optional — The address for the created project's location.
      projectLocation__state: "CA", // optional — The address for the created project's location.
      title: "Website Redesign", // required — The title of the created project.
      client__email: "john.smith@webco.com", // required — The client's email address.
    },
  });
}
