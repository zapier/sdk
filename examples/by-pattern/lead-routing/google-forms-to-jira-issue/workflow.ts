import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

// Edit these three constants before deploying — see README.md for how to discover them.
const JIRA_CONNECTION = "jira_primary";
const JIRA_PROJECT_KEY = "SUP";
const JIRA_ISSUE_TYPE = "Bug";

// Field labels on the source Google Form. Edit to match how the form owner named them.
const FIELD_SUMMARY = "Short summary";
const FIELD_DETAILS = "What happened?";
const FIELD_EMAIL = "Your email";

const JIRA_APP_KEY = "JiraSoftwareCloudCLIAPI";

// Google Forms's Zapier surface only exposes triggers (New / New or Updated
// Form Response) — no runAction call fetches a response by id. Wire the trigger
// directly to this workflow's endpoint and the response payload arrives as
// rawInput: { responseId, <field label>: <answer>, ... }.
const InputSchema = z
  .object({ responseId: z.string() })
  .catchall(z.unknown());
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { issueCreated: boolean }>(
  "google-forms-to-jira-issue",
  async (ctx, rawInput) => {
    const response = InputSchema.parse(rawInput);
    const summary = String(response[FIELD_SUMMARY] ?? "Bug report (no summary)").slice(0, 250);
    const details = String(response[FIELD_DETAILS] ?? "");
    const reporter = String(response[FIELD_EMAIL] ?? "unknown");

    await ctx.step(`create-jira-issue-${response.responseId}`, async () =>
      sdk.runAction({
        appKey: JIRA_APP_KEY,
        actionType: "write",
        actionKey: "create_issue",
        connection: JIRA_CONNECTION,
        inputs: {
          project: JIRA_PROJECT_KEY,
          issuetype: JIRA_ISSUE_TYPE,
          // summary, description are dynamic per (project, issuetype) — the Jira
          // schema surfaces them only after those two are chosen. Verify with
          // getActionInputFieldsSchema against your connection.
          summary,
          description: `Reported by ${reporter}\n\n${details}`,
        },
      }),
    );

    return { issueCreated: true };
  },
);
