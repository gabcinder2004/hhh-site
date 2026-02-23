# Stage 3: Design (OpenSpec)

Transform brainstorming output into structured, testable specifications using OpenSpec.

## Artifact Flow

```
Proposal → Design → Specs → Tasks
```

Each artifact builds on the previous. OpenSpec skills guide you through this progression.

## When to Use Fast-Forward

If brainstorming produced clear, unambiguous design decisions:
```
Skill: opsx:ff
```
This generates all artifacts (proposal through tasks) in one pass.

## When to Step Through

If the design has open questions or multiple valid approaches:
```
Skill: opsx:new      # Start a new change
Skill: opsx:continue  # Create next artifact
```
Step through each artifact, reviewing and refining as you go.

## Spec Format

Specs use **WHEN/THEN scenarios** that map directly to test cases:

```
WHEN the user clicks the Discord button
THEN it opens the Discord invite URL in a new tab
AND the link has rel="noopener noreferrer"

WHEN the footer renders
THEN it displays the current year in the copyright
AND it shows all four navigation links
```

### Rules for Specs
- Each scenario becomes one or more test assertions
- Scenarios must be specific and verifiable — no vague "should work correctly"
- Link every scenario back to a capability from the proposal
- Cover happy path, edge cases, and accessibility

## Specs Directory

OpenSpec artifacts live in:
```
openspec/
  changes/    # Active change artifacts (proposal, design, specs, tasks)
  specs/      # Merged specifications (after opsx:sync)
```

## Rules

- **Specs before code** — implementation doesn't start until specs exist
- **Scenarios = tests** — every WHEN/THEN becomes a test case in Stage 4
- **No gold-plating** — spec only what was decided in brainstorming
