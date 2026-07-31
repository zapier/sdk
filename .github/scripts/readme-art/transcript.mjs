/**
 * The demo transcript — REAL output, not typeset. Every output line below was
 * captured from the live Zapier catalog and a live GitHub connection.
 *
 * Captured 2026-07-31 on main @ 20104c0 with @zapier/zapier-sdk-cli 0.65.5
 * (the version pinned in package.json), authenticated via `zapier-sdk login`:
 *
 *   npx zapier-sdk list-actions github --action-type search --json \
 *     | jq -r '.data[].key'
 *   npx zapier-sdk run-action github search repository_v2 \
 *     --connection <connection-id> \
 *     --inputs '{"owner":"zapier","repo":"sdk"}' --json \
 *     | jq '.data[0] | {full_name, description, stargazers_count, html_url}'
 *
 * stdout is shown verbatim. Two departures from the raw capture: the CLI's
 * update-notifier banner (stderr, environment-dependent) is omitted, and the
 * final segment of the `--connection` UUID is masked with zeros — connection
 * ids are per-account identifiers, not credentials, but there's no reason to
 * publish a real one. Swap in your own from `zapier-sdk list-connections
 * github`. `stargazers_count` moves over time; the action keys and repo
 * fields are whatever the live catalog and GitHub return on the day of
 * capture.
 */

/** A run of same-colored characters. Color keys resolve in terminal.mjs. */
const cmd = (...segments) => ({ kind: "cmd", segments });
const out = (...segments) => ({ kind: "out", segments });
const blank = { kind: "blank", segments: [] };

export const TRANSCRIPT = [
  cmd(
    ["$ ", "prompt"],
    ["npx zapier-sdk list-actions github --action-type search --json | jq -r ", "plain"],
    ["'.data[].key'", "amber"],
  ),
  out(["branch", "dim"]),
  out(["get_file_contents", "dim"]),
  out(["members", "dim"]),
  out(["organization", "dim"]),
  out(["repository", "dim"]),
  out(["repository_v2", "accent"]),
  out(["repo_issue", "dim"]),
  out(["repo_pull", "dim"]),
  out(["user", "dim"]),
  blank,
  cmd(["$ ", "prompt"], ["npx zapier-sdk run-action github search repository_v2 ", "plain"], ["\\", "dim"]),
  cmd(["    --connection 029ac344-b186-8f6d-bc42-000000000000 ", "plain"], ["\\", "dim"]),
  cmd(["    --inputs ", "plain"], ["'{\"owner\":\"zapier\",\"repo\":\"sdk\"}'", "amber"], [" --json ", "plain"], ["\\", "dim"]),
  cmd(["    | jq '.data[0] | {full_name, description, stargazers_count, html_url}'", "plain"]),
  out(["{", "plain"]),
  out(["  \"full_name\"", "accent"], [": ", "plain"], ["\"zapier/sdk\"", "green"], [",", "plain"]),
  out(
    ["  \"description\"", "accent"],
    [": ", "plain"],
    ["\"Agent-readable docs, verified examples, and skill manifest for @zapier/zapier-sdk\"", "green"],
    [",", "plain"],
  ),
  out(["  \"stargazers_count\"", "accent"], [": ", "plain"], ["242", "amber"], [",", "plain"]),
  out(["  \"html_url\"", "accent"], [": ", "plain"], ["\"https://github.com/zapier/sdk\"", "green"]),
  out(["}", "plain"]),
];
