# CLI reference

Read this when the user wants shell access instead of TypeScript, or when you need to discover apps / actions / inputs interactively before writing code.

The CLI (`npx zapier-sdk ...`) mirrors the SDK surface. Every command below has an SDK equivalent.

## Setup

```bash
npx zapier-sdk login                             # Opens browser, stores credentials locally.
npx zapier-sdk get-profile                       # Confirm auth is working.
```

## Discovery

```bash
# What apps exist?
npx zapier-sdk list-apps --search notion

# What actions does an app expose? Optionally filter by type.
npx zapier-sdk list-actions notion
npx zapier-sdk list-actions notion --action-type search

# Inspect a specific action.
npx zapier-sdk get-action notion search page_by_title

# What inputs does an action take?
npx zapier-sdk list-action-input-fields notion search page_by_title

# Full JSON Schema for the inputs (for programmatic validation).
npx zapier-sdk get-action-input-fields-schema notion search page_by_title

# What choices exist for a dynamic-dropdown field?
npx zapier-sdk list-action-input-field-choices notion write create_database_item datasource
```

## Connections

```bash
# What connections do I have?
npx zapier-sdk list-connections
npx zapier-sdk list-connections notion

# Create a new connection (opens browser for OAuth).
npx zapier-sdk create-connection notion

# For agent-driven flows: get the OAuth URL directly, then poll.
npx zapier-sdk get-connection-start-url notion
npx zapier-sdk wait-for-new-connection notion <started-at-timestamp>
```

## Run actions

```bash
# Try an action end to end.
npx zapier-sdk run-action notion search page_by_title \
  --inputs '{"title":"Meeting Notes","exact_match":"no"}'

# Pass a connection alias / ID explicitly.
npx zapier-sdk run-action notion write create_database_item \
  --connection <connection-id-or-alias> \
  --inputs '{"datasource":"<db-id>","properties":{...}}'
```

## Tables

```bash
npx zapier-sdk list-tables
npx zapier-sdk list-table-fields <table-id>
npx zapier-sdk list-table-records <table-id>
```

## Options for any command

- `--json`: raw JSON output for programmatic use (default is a formatted table).
- `--max-items <n>`: cap total results across pages.
- `--page-size <n>`: items per page.
- `--cursor <string>`: resume from a previous cursor.

## Full command inventory

The commands above are the happy-path subset. For every command the CLI ships — including experimental workflow, trigger-inbox, and utility commands — see [`cli-commands.md`](./cli-commands.md), regenerated verbatim from `zapier-sdk --help` on each release bump.

Detailed schemas and examples: https://docs.zapier.com/sdk/cli-reference
