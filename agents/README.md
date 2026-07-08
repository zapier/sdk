# Agents

Claude Code subagents that pair with [`skills/zapier-sdk`](../skills/zapier-sdk/). Optional. Skip this directory if you don't use Claude Code.

Subagents live in their own context window with a restricted tool surface and a focused system prompt. They're additive on top of the skill: the skill teaches agents how to use the SDK; a subagent handles one bounded task within that.

## Available

| File | What it does |
|---|---|
| [`zapier-sdk-explorer.md`](./zapier-sdk-explorer.md) | Read-only investigator. Given a natural-language description of a workflow, resolves the exact `implementation_id`, keys, connection IDs, and field choices via `zapier-sdk` CLI. Returns a structured build plan. Never writes files or runs side effects. |

## Install

Copy any file into your project's `.claude/agents/` directory:

```bash
mkdir -p .claude/agents
curl -o .claude/agents/zapier-sdk-explorer.md \
  https://raw.githubusercontent.com/zapier/sdk/main/agents/zapier-sdk-explorer.md
```

Or, for all your projects:

```bash
mkdir -p ~/.claude/agents
cp agents/zapier-sdk-explorer.md ~/.claude/agents/
```

Claude Code picks it up automatically on the next delegation. If it doesn't appear, restart Claude Code (the file watcher only covers directories that existed at session start).

## Portability

These files use Claude Code's subagent format. They **do not** load in Cursor, GitHub Copilot, Codex, or generic MCP clients. For cross-platform coverage, use the [skill](../skills/zapier-sdk/) instead: it conforms to [agentskills.io](https://agentskills.io) and works across any conformant runtime.

## Format reference

Subagent frontmatter, tool restrictions, and best practices: [code.claude.com/docs/en/sub-agents](https://code.claude.com/docs/en/sub-agents).
