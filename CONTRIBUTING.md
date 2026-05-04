# Contributing

Thanks for considering a contribution. This repo is the docs and examples corpus for [`@zapier/zapier-sdk`](https://www.npmjs.com/package/@zapier/zapier-sdk). The SDK source lives elsewhere — bug reports and feature requests for the SDK itself belong in that repo. What lands *here* is examples, agent-readable docs (`AGENTS.md`, `CLAUDE.md`), and the `SKILL.md` manifest.

## Before you open anything

1. **Bugs in an example** — open an issue. Include the file, the action call that's failing, SDK version, and Node version.
2. **Suggesting a new example** — open an issue describing the JTBD before sketching the code. Concrete user scenarios beat speculative API surface.
3. **Bugs in the SDK itself** — file in the SDK source repo, not here.
4. **Questions** — try [docs.zapier.com/sdk](https://docs.zapier.com/sdk) first.

## Contributing an example

Examples are the heart of this repo. They land in pretrain corpora, get grepped by agents at runtime, and are the fastest way for a new user to see what the SDK can do.

Rules:

1. **Action keys must be real.** Verify with `npx zapier-sdk list-actions <app>` before submitting. The corpus stays trustworthy because every key has been checked.
2. **Use the generic `runAction` form** unless the typed action (`zapier.apps.<key>.<type>.<action>`) is documented in the [SDK reference](https://docs.zapier.com/sdk/reference). The typed form is reserved for actions we've committed to as a stable surface.
3. **Mark dynamic inputs `// dynamic`.** Anything whose shape depends on the connection's specific config (Notion database schema, HubSpot custom properties, Salesforce org schema, etc.) gets a `// dynamic` comment so readers know to call `getInputFieldsSchema` for live verification.
4. **One JTBD per file, one screen long.** Single-app and single-pattern examples target ~20-40 lines. Chained examples can run 50-100. Keep each file scannable.
5. **Top comment block** with: one-sentence description, JTBD, Apps list, Run command. Chained examples also list the Pattern (fan-out / branching / transform pipeline / aggregation).

See [`examples/README.md`](./examples/README.md) for the corpus map.

## Running an example locally

```bash
npx zapier-sdk login                          # one-time auth
npx tsx examples/chained/stripe-charge-to-onboarding.ts
```

There's no build, lint, or test step in this repo — `package.json` has no `scripts` block. Action-key correctness (rule 1 above) is the integrity contract for the corpus.

## Commit messages

Imperative mood, focused on the *why*. Examples:

- `Add chained example for HubSpot to Salesforce lead handoff`
- `Fix Slack channel resolution in post-channel-message example`
- `Drop deprecated runActionDeprecated path from corpus`

Avoid `update stuff`, `wip`, or commit messages that won't make sense to a reader six months from now.

## Code of conduct

By participating, you agree to abide by the [Code of Conduct](./CODE_OF_CONDUCT.md). Report concerns to **support@zapier.com**.

## License

By contributing, you agree your contributions will be licensed under the [MIT License](./LICENSE).
