import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

// Edit these three constants before deploying. See README.md for how to discover them.
const GOOGLE_SHEETS_CONNECTION = "google_sheets_primary";
const SPREADSHEET = "Registrations";
const WORKSHEET = "Sheet1";

const GOOGLE_SHEETS_APP_KEY = "GoogleSheetsV2CLIAPI";

const InputSchema = z.object({
  attendeeId: z.string(),
  eventName: z.string(),
  name: z.string(),
  email: z.string().email(),
  ticketClass: z.string().optional(),
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { rowAdded: boolean }>(
  "eventbrite-to-google-sheets",
  async (ctx, rawInput) => {
    const { attendeeId, eventName, name, email, ticketClass } = InputSchema.parse(rawInput);

    await ctx.step(`append-row-${attendeeId}`, async () =>
      sdk.runAction({
        appKey: GOOGLE_SHEETS_APP_KEY,
        actionType: "write",
        actionKey: "add_row",
        connection: GOOGLE_SHEETS_CONNECTION,
        inputs: {
          drive: "My Drive",
          spreadsheet: SPREADSHEET,
          worksheet: WORKSHEET,
          // Row columns are dynamic — they must match your worksheet's header
          // row exactly.
          Name: name,
          Email: email,
          Event: eventName,
          "Ticket Type": ticketClass,
        },
      }),
    );

    return { rowAdded: true };
  },
);
