# by-domain

Domain-specific curation of the examples corpus. **No original code lives here** — every workflow entry is a filesystem **symlink** pointing at the canonical source under [`../by-pattern/`](../by-pattern).

## What "domain" means here

A domain is a **recurring app stack** — the same handful of apps a specific audience wires together over and over.

- **Function** — the team that would build this automation (engineering, gtm, customer-support). Cuts across industries.
- **Vertical** — the industry a customer operates in (real-estate, hospitality, non-profit, e-learning). Cuts across functions.

Domain slugs are kebab-case. Function slugs stay singular (`engineering`, not `engineers`). Vertical slugs use the customer-facing name (`real-estate`, not `real-estate-agents`).

Two audiences benefit:

1. **AI agents** deciding which examples to load when a user gives them a domain-flavored prompt.
2. **Humans** browsing the corpus who identify with a team or industry rather than a shape or app.

## How it's organized

Each subdirectory is one domain. Inside, filesystem symlinks point at canonical workflow directories under `by-pattern/`:

```
by-domain/<slug>/
├── README.md
└── <workflow-name>   → ../../by-pattern/<shape>/<workflow-name>
```

`cd` into a symlink and you're inside the canonical workflow directory. Git tracks symlinks; GitHub renders them as links you can click through.

Browse subdirectories to see current domains.

## Contributing a new domain

1. Confirm the domain has at least three workflows that would live in it. Pointer-only domains aren't useful.
2. Create `by-domain/<slug>/README.md`.
3. Symlink each canonical workflow: `ln -s ../../by-pattern/<shape>/<workflow-dir> <workflow-dir>`.

Never create original code under `by-domain/`. If a pattern is missing an example, add it under `by-pattern/` and symlink from here.

## Constraint: curation only

`by-domain/` is a read-through layer. If you're tempted to write a domain-specific version of a `by-pattern/` file, ask why the underlying file can't be parameterized instead. The corpus stays small and durable when each pattern has exactly one canonical implementation.
