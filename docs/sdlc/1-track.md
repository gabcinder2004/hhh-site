# Stage 1: Track

Create a beads issue **before** writing any code. Every change — no matter how small — gets tracked.

## Create an Issue

```bash
bd create --title="Short imperative description" --type=task|bug|feature --priority=2
```

### Required Fields
- **title**: Short, imperative ("Add logout button", "Fix nav overlap on mobile")
- **type**: `task` | `bug` | `feature`
- **priority**: 0-4 (0=critical, 2=medium, 4=backlog) — use numbers, NOT words

### Optional Fields
- `--description="Detailed context"` — add when the title alone isn't enough

## Check for Existing Work First

Before creating new issues, check what already exists:

```bash
bd ready                    # Issues ready to work (no blockers)
bd list --status=open       # All open issues
bd list --status=in_progress  # Currently active work
bd show <id>                # Full issue details + dependencies
```

## Claim Work

```bash
bd update <id> --status=in_progress
```

## Dependencies

When one issue must complete before another can start:

```bash
bd dep add <blocked-issue> <blocker-issue>
bd blocked    # See all blocked issues
```

## Multiple Related Issues

For epics or multi-part features, create separate issues and link with dependencies. Use parallel subagents when creating many issues at once.

## Rules

- **One issue per logical change** — don't bundle unrelated work
- **Never skip tracking** — even "quick fixes" get an issue
- **Do NOT use `bd edit`** — it opens an interactive editor that blocks agents
