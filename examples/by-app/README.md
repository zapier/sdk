# by-app

**Plain SDK examples — one app, one action, no durable wrapper.** Everything here uses `@zapier/zapier-sdk` directly: `createZapierSdk()`, `findFirstConnection`, `runAction`, done. No `@zapier/zapier-durable`, no `ctx.step`, no Zod schemas.

Reach for these when you want to make one authenticated call to a single app from your own code — a Next.js route, a script, a Lambda, an ad-hoc terminal command. If your example touches *two* apps, it belongs in [`../by-pattern/`](../by-pattern).

## How it's organized

One subdirectory per Zapier app (the app slug is the folder name). Each app subdir has its own `README.md` listing the actions demonstrated inside. Every `.ts` file is under 40 lines, uses exactly one app, and demonstrates exactly one action. Run with `npx tsx examples/by-app/<app>/<file>.ts`.

Browse subdirectories directly to see what's covered.

## Contributing a new `by-app/` example

See [`../../CONTRIBUTING.md`](../../CONTRIBUTING.md) for the corpus-wide rules. Local rules:

1. Pick the target app. If the folder doesn't exist yet, create `by-app/<app-slug>/` with its own `README.md`.
2. Name the file after the action: `send-channel-message.ts`, `create-lead.ts`, `find-issue.ts`.
3. Keep it under 40 lines. If it grows past that, it probably belongs in `by-pattern/`.
