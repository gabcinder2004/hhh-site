# Stage 5: Verify

Run all quality gates. If anything fails, fix and re-verify until everything passes.

## Definition of Done

**ALL criteria must pass before moving to Stage 6.**

| # | Criterion | Command | Pass Condition |
|---|-----------|---------|----------------|
| 1 | Tests pass | `npx vitest run` | Exit code 0, all tests green |
| 2 | Build succeeds | `npx next build` | Exit code 0, no errors |
| 3 | Lint clean | `npx next lint` | No errors or warnings |
| 4 | Coverage | `npx vitest run` | New code has corresponding tests |
| 5 | Docs coherent | Manual review | Specs match implementation, design doc is current |
| 6 | Specs synced | `Skill: opsx:sync` | Delta specs merged to main specs (if applicable) |
| 7 | No regressions | `npx vitest run` | Test count doesn't drop from before the change |

## Verify Loop

```
Run all quality gates
  ↓
All pass? → Yes → Proceed to Stage 6
  ↓ No
Identify failures
  ↓
Spawn agent(s) to fix
  ↓
Re-run quality gates
  ↓
(repeat until all green)
```

### Fix Strategy
- **Test failures**: Read the failure output, fix the code or test
- **Build errors**: Usually type errors or missing imports — fix in place
- **Lint errors**: Apply ESLint auto-fix first (`npx eslint --fix`), then manual fixes
- **Coverage gaps**: Write missing tests for uncovered code paths
- **Doc drift**: Update design doc or specs to reflect what was actually built

## Verification Skill

Before claiming work is complete, invoke:
```
superpowers:verification-before-completion
```
This ensures you've actually run the commands and checked their output — no assumptions.

## Rules

- **Never skip verification** — even for "trivial" changes
- **Evidence before assertions** — run commands, read output, then claim pass/fail
- **Fix, don't bypass** — if lint or tests fail, fix the root cause; don't disable rules
- **Verify on the feature branch** — all gates pass before the PR is created
