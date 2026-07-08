import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

// Edit these three constants before deploying. See README.md for how to discover them.
const JIRA_CONNECTION = "jira_primary";
const JIRA_PROJECT_KEY = "ENG";
const JIRA_ISSUE_TYPE = "Bug";

const JIRA_APP_KEY = "JiraSoftwareCloudCLIAPI";

const InputSchema = z.object({
  content: z.string(),
  user_id: z.string(),
  channel_id: z.string(),
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { issueCreated: boolean }>(
  "discord-message-to-jira-issue",
  async (ctx, rawInput) => {
    const msg = InputSchema.parse(rawInput);
    const [summary, ...rest] = msg.content.split("\n");
    const description = `Reported by <@${msg.user_id}> in <#${msg.channel_id}>\n\n${rest.join("\n") || summary}`;

    await ctx.step("create-jira-issue", async () =>
      sdk.runAction({
        appKey: JIRA_APP_KEY,
        actionType: "write",
        actionKey: "create_issue",
        connection: JIRA_CONNECTION,
        inputs: {
          project: JIRA_PROJECT_KEY,
          issuetype: JIRA_ISSUE_TYPE,
          // summary, description are dynamic per (project, issuetype). The Jira
          // schema surfaces them only after those two are chosen. Verify with
          // getActionInputFieldsSchema against your connection.
          summary: summary.slice(0, 250),
          description,
        },
      }),
    );

    return { issueCreated: true };
  },
);
