# Contributing

Thanks for considering a contribution. This repo is the docs and examples corpus for [`@zapier/zapier-sdk`](https://www.npmjs.com/package/@zapier/zapier-sdk). The SDK source lives elsewhere — bug reports and feature requests for the SDK itself belong in that repo.

## Before you open anything

1. **Bugs in an example** — open an issue. Include the file, the action call that's failing, SDK version, and Node version.
2. **Suggesting a new example** — open an issue describing the JTBD before sketching the code. Concrete user scenarios beat speculative API surface.
3. **Bugs in the SDK itself** — file in the SDK source repo, not here.
4. **Questions** — try [docs.zapier.com/sdk](https://docs.zapier.com/sdk) first.

## Contributing an example

Examples are the heart of this repo. Rules of engagement — action-key correctness, `// dynamic` inputs, `runAction` vs typed forms — live in [`AGENTS.md`](./AGENTS.md); follow those.

Layout rules:

- **Which folder?** See [`examples/README.md`](./examples/README.md) for the three-way index (`by-app/`, `by-pattern/`, `by-domain/`) and what belongs where.
- **`by-app/`** — one file, one action, ~40 lines. See [`examples/by-app/README.md`](./examples/by-app/README.md).
- **`by-pattern/`** — durable-workflow directory (`workflow.ts` + `package.json` + `README.md`). See [`examples/by-pattern/README.md`](./examples/by-pattern/README.md).
- **`by-domain/`** — symlinks only, no original code. See [`examples/by-domain/README.md`](./examples/by-domain/README.md).

## CI

Every PR runs [`.github/workflows/validate.yml`](./.github/workflows/validate.yml). Two scripts do the work — see [`.github/scripts/README.md`](./.github/scripts/README.md) for what each checks, how to run them locally, and how to enable the credentialed audit on a fork.

## Commit messages

Imperative mood, focused on the *why*. Examples:

- `Add chained example for Typeform lead to HubSpot upsert`
- `Fix Notion database property mapping in create-page example`
- `Drop deprecated runActionDeprecated path from corpus`

Avoid `update stuff`, `wip`, or commit messages that won't make sense to a reader six months from now.

## Code of conduct

By participating, you agree to abide by the [Code of Conduct](./CODE_OF_CONDUCT.md). Report concerns to **support@zapier.com**.

## License

By contributing, you agree your contributions will be licensed under the [MIT License](./LICENSE).
