# Stage 2: Brainstorm

Explore the problem space before designing solutions. This stage gathers context, validates assumptions, and produces informed design decisions.

## Required Skills

### Always Invoke
```
superpowers:brainstorming
```
Invoke this skill **before any creative work** — features, components, modifications, or behavior changes.

### For UI Work
```
frontend-design:frontend-design
```
Invoke this skill for **any work that touches visual output** — components, pages, layouts, styling.

## Parallel Research Agents

Spawn these concurrently to gather context fast:

### 1. Codebase Exploration (Explore agent)
```
Task tool → subagent_type: "Explore"
```
- Find existing patterns, related components, file conventions
- Understand how similar features are already built
- Identify files that will be touched

### 2. Web Research (general-purpose agent)
```
Task tool → subagent_type: "general-purpose"
```
- Best practices for the feature type
- Library documentation via WebSearch/WebFetch
- Accessibility guidelines, UX patterns

### 3. Library Documentation (Context7)
```
mcp__plugin_context7_context7__resolve-library-id → query-docs
```
- Look up current API docs for Next.js, React, Tailwind, Vitest, etc.
- Use when you need accurate, up-to-date API details

## Output

Brainstorming produces a design document saved to:
```
docs/plans/YYYY-MM-DD-<topic>-design.md
```

### Design Document Contents
- **Context**: What problem are we solving? Why now?
- **Design decisions**: Numbered list of choices with rationale
- **Visual concept**: ASCII layout, component hierarchy (for UI work)
- **Implementation notes**: Files to modify, dependencies, constraints
- **Test coverage**: What scenarios to verify
- **YAGNI list**: What we're explicitly NOT building

## Rules

- **Don't skip brainstorming** — even for "obvious" changes, the skill surfaces edge cases
- **Design docs are durable** — they live in `docs/plans/` for future reference
- **Parallel agents are preferred** — don't research sequentially when you can fan out
