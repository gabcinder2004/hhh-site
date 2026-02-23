# Happy Hour Heroes — Guild Website

TurtleWoW guild site built with Next.js 16, React 19, Tailwind v4, Sanity CMS, Vitest.
For full project context → see `docs/sdlc/project-context.md`

---

## SDLC Pipeline

**Every change goes through all 6 stages. No exceptions. No shortcuts.**

| Stage | Action | Details |
|-------|--------|---------|
| 1. Track | Create a beads issue before touching code | `docs/sdlc/1-track.md` |
| 2. Brainstorm | Invoke skills, spawn research agents, produce design doc | `docs/sdlc/2-brainstorm.md` |
| 3. Design | OpenSpec artifacts: proposal → design → specs → tasks | `docs/sdlc/3-design.md` |
| 4. Implement | TDD on a feature branch, parallelize with agent teams | `docs/sdlc/4-implement.md` |
| 5. Verify | All quality gates pass (tests, build, lint, coverage, docs) | `docs/sdlc/5-verify.md` |
| 6. Deliver | Commit, push, PR, close issues, bd sync | `docs/sdlc/6-deliver.md` |

---

## Non-Negotiable Rules

1. **Full ceremony always** — every change, no matter how small, goes through all 6 stages
2. **TDD** — write failing tests from spec scenarios first, then code to pass them
3. **Feature branches + PRs** — no direct commits to master
4. **Track everything** — `bd create` before code, `bd close` after delivery
5. **Verify before claiming done** — run commands, read output, evidence before assertions

---

## Skills to Invoke

| When | Skill |
|------|-------|
| Any creative/feature work | `superpowers:brainstorming` |
| Any UI work | `frontend-design:frontend-design` |
| Starting implementation | `superpowers:test-driven-development` |
| Before claiming complete | `superpowers:verification-before-completion` |
| Clear spec from brainstorming | `opsx:ff` (fast-forward all artifacts) |
| Stepping through artifacts | `opsx:new` → `opsx:continue` |

---

## Parallelism

### Preferred: Agent Teams
```
TeamCreate → TaskCreate (per component) → Task(team_name, spawn teammates)
```

### Fallback: Parallel Subagents
```
Task tool → subagent_type: "general-purpose" (multiple concurrent)
```

### Sequencing Rule
Tasks touching the **same files** → sequential (use `addBlockedBy`).
Independent components → parallel.

---

## Quality Gates (all must pass)

```bash
npx vitest run      # Tests pass, no regressions
npx next build      # Build succeeds
npx next lint       # Lint clean
```

New code must have test coverage. Specs must match implementation.

---

## Session Close Checklist

```bash
git status                    # Check what changed
git add <files>               # Stage code changes
bd sync                       # Sync beads
git commit -m "type: desc"    # Commit
bd sync                       # Sync new beads changes
git push                      # Push to remote — work is NOT done until pushed
```

---

## Key Paths

| Path | Purpose |
|------|---------|
| `src/app/` | Next.js App Router pages |
| `src/components/` | React components + co-located tests |
| `openspec/` | OpenSpec changes and specs |
| `docs/plans/` | Design documents |
| `docs/sdlc/` | SDLC workflow documentation |
| `sanity/` | Sanity CMS schemas |
| `AGENTS.md` | Beads quick reference for agents |
