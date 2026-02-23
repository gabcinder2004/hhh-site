# Stage 6: Deliver

Commit, push, create a PR, and close tracking issues.

## Git Workflow

### Commit on Feature Branch
```bash
git add <specific-files>
git commit -m "feat: short description of the change"
```

Commit message prefixes: `feat:`, `fix:`, `chore:`, `test:`, `docs:`, `refactor:`

### Push and Create PR
```bash
git push -u origin feature/<branch-name>
gh pr create --title "Short PR title" --body "$(cat <<'EOF'
## Summary
- What changed and why

## Test plan
- [ ] All tests pass
- [ ] Build succeeds
- [ ] Lint clean
EOF
)"
```

### Merge Strategy
- PRs target `master`
- Squash merge preferred for clean history
- Delete the feature branch after merge

## Beads Closure

```bash
bd close <id>                    # Close single issue
bd close <id1> <id2> ...         # Close multiple issues at once
bd close <id> --reason="Done: implemented enhanced footer with Discord CTA"
```

## Session Close Checklist

**MANDATORY** — run through every item before ending a session:

```bash
# 1. Check what changed
git status

# 2. Stage code changes
git add <files>

# 3. Sync beads
bd sync

# 4. Commit code
git commit -m "feat: description"

# 5. Sync any new beads changes
bd sync

# 6. Push to remote
git push

# 7. Verify
git status   # Must show "up to date with origin"
```

## Rules

- **Feature branches + PRs always** — no direct commits to master
- **Never skip the push** — work is not done until it's on the remote
- **Close all related issues** — don't leave tracking debris
- **bd sync at session end** — ensures beads state is persisted
