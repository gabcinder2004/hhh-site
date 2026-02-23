## Execution Plan

### Workflow Rules
- **TDD**: Write test file BEFORE implementation file for every component/utility
- **Tracking**: Each task group maps to a beads issue (`bd create` before starting group)
- **Branch**: All work on `feature/member-roster`, PR to master when complete
- **Invoke `frontend-design:frontend-design`** before writing any component markup/styles

### Parallelism Map
- **Group 1** (tasks 1.1–1.6): Mostly independent → parallel agents
  - 1.1 (classData) is standalone
  - 1.2/1.3 (armory + test): TDD pair → single agent, test first
  - 1.4/1.5 (Sanity schema + registration): sequential, single agent
  - 1.6 (queries/types): standalone
- **Group 2** (tasks 2.1–2.8): Depends on Group 1 → starts after Group 1
  - 2.1/2.2 (MemberCard + test): TDD pair → one agent
  - 2.3/2.4 (ClassFilter + test): TDD pair → one agent (parallel with MemberCard)
  - 2.5/2.6 (RankGroup + test): TDD pair → one agent (parallel with above)
  - 2.7/2.8 (RosterClient + test): Depends on 2.1–2.6 → sequential after them
- **Group 3** (tasks 3.1–3.3): Depends on Groups 1+2 → sequential after Group 2
- **Group 4** (tasks 4.1–4.3): Independent of Groups 2+3 → can parallel with Group 2
- **Group 5** (tasks 5.1–5.3): Final verification → sequential, last

### Agent Team Structure
```
TeamCreate "member-roster"
  ├─ Lead: coordinates, assigns, reviews
  ├─ Agent A: Group 1 data layer (classData, armory+test, queries)
  ├─ Agent B: Group 1 Sanity (schema, registration)
  ├─ Agent C: Group 2 MemberCard (test first, then component)
  ├─ Agent D: Group 2 ClassFilter (test first, then component)
  ├─ Agent E: Group 2 RankGroup (test first, then component)
  ├─ Agent F: Group 4 Nav updates (Navbar, Footer, tests)
  └─ Lead handles: RosterClient, Page, Verification (sequential, after agents finish)
```

---

## 1. Data Layer & Constants

- [x] 1.1 Create `src/lib/classData.ts` with WoW class colors, names, race names, class-to-role mappings, and class icon identifiers
- [x] 1.2 Create `src/lib/armory.ts` with `fetchCharacterData()` utility — HTML fetch, Livewire snapshot extraction, HTML entity decoding, JSON parsing, returns null on failure
- [x] 1.3 Create `src/lib/armory.test.ts` — test successful extraction, missing snapshot, network error, HTML entity decoding, race/class ID mapping
- [x] 1.4 Create Sanity member schema at `sanity/schemas/member.ts` with characterName, realm, guildRank, role, notes fields
- [x] 1.5 Register member schema in `sanity/schema.ts`
- [x] 1.6 Add `membersQuery` GROQ query and `Member` type to `src/lib/sanity/queries.ts` and `src/lib/sanity/types.ts`

## 2. Components

- [x] 2.1 Create `src/components/MemberCard.tsx` — compact card with class-colored left border, online dot, name link, level, race/class/role, PvP rank, class-color hover glow. Fallback variant for Sanity-only data
- [x] 2.2 Create `src/components/MemberCard.test.tsx` — test enriched card, fallback card, online/offline states, PvP rank omission, class color border, armory link
- [x] 2.3 Create `src/components/ClassFilter.tsx` — "All" pill + 9 class circle buttons with class colors, active/inactive/hover states, glowPulse on active
- [x] 2.4 Create `src/components/ClassFilter.test.tsx` — test click toggles, active state rendering, all-reset behavior
- [x] 2.5 Create `src/components/RankGroup.tsx` — ornamental divider (Cinzel Decorative heading, diamond ornaments, gold rules) + responsive card grid
- [x] 2.6 Create `src/components/RankGroup.test.tsx` — test rank heading renders, cards display, empty group hidden
- [x] 2.7 Create `src/components/RosterClient.tsx` — client wrapper managing filter state, passes filtered opacity to cards, groups members by rank, renders GM featured card
- [x] 2.8 Create `src/components/RosterClient.test.tsx` — test filtering logic, rank grouping, GM featured card, fade behavior, staggered animation delays

## 3. Page & Routing

- [x] 3.1 Create `src/app/roster/page.tsx` — server component fetching Sanity members, batch-fetching armory data with delay, passing enriched data to RosterClient
- [x] 3.2 Create `src/app/roster/page.test.tsx` — test page renders, empty state, Sanity-not-configured placeholder
- [x] 3.3 Add shimmer heading "Guild Roster" and member count subtitle

## 4. Navigation Updates

- [x] 4.1 Add `{ href: '/roster', label: 'Roster' }` to Navbar between Raids and Gallery
- [x] 4.2 Add Roster link to Footer navigation
- [x] 4.3 Update Navbar and Footer tests for new Roster link

## 5. Verification

- [x] 5.1 All tests pass (`npx vitest run`)
- [x] 5.2 Build succeeds (`npx next build`)
- [x] 5.3 Lint clean (`npx next lint`)
