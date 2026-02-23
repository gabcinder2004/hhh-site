# Stage 4: Implement

Write code using TDD on a feature branch. Parallelize with agent teams when possible.

## Feature Branch

Create a branch from master **before** writing any code:
```bash
git checkout -b feature/<short-description>
```

Branch naming: `feature/enhanced-footer`, `fix/nav-mobile-overlap`, `chore/add-sdlc-docs`

## Test-Driven Development

**Tests come first. Always.**

### TDD Cycle
1. **Write failing tests** from spec scenarios (Stage 3 WHEN/THEN)
2. **Run tests** — confirm they fail for the right reason
3. **Write minimal code** to make tests pass
4. **Refactor** — clean up while tests stay green
5. **Repeat** for next scenario

### Test File Convention
- Co-located: `ComponentName.test.tsx` next to `ComponentName.tsx`
- Page tests: `page.test.tsx` next to `page.tsx`
- Use Vitest + Testing Library (`@testing-library/react`)

### What to Test
- Every WHEN/THEN scenario from the spec
- Accessibility attributes (aria-labels, semantic HTML)
- Conditional rendering and edge cases
- NOT: internal implementation details, CSS classes, snapshot tests

## Parallelism Strategy

### Preferred: Agent Teams
```
TeamCreate → TaskCreate (multiple) → Task tool with team_name (spawn teammates)
```
- Create a team for the feature
- Break work into tasks (one per component/file)
- Spawn teammates to work in parallel
- Tasks touching the **same files MUST be sequential** — use `addBlockedBy`

### Fallback: Parallel Subagents
```
Task tool → subagent_type: "general-purpose" (multiple concurrent)
```
Use when Teams are unavailable or the work is small enough to not warrant a team.

### Sequencing Rules
- Components with no shared files → parallel
- Shared utilities or types → sequential (create first, then consumers)
- Tests and implementation of the SAME component → same agent (TDD cycle)

## Implementation Rules

- **Server components by default** — only add `'use client'` when interactivity is needed
- **Follow existing patterns** — match the style of neighboring components
- **No gold-plating** — implement what the spec says, nothing more
- **Commit incrementally** — one logical change per commit on the feature branch
