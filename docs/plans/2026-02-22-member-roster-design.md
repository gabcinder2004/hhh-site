# Member Roster — Design Document

**Date**: 2026-02-22
**Phase**: 2
**Status**: Approved

---

## Overview

A dedicated `/roster` page displaying all guild members with live character data from turtlecraft.gg armory. Grouped by guild rank, with a class filter bar. Compact card layout matching the Gilded Tavern aesthetic.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Default grouping | Guild rank (GM → Officers → Raiders → Members) with role shown on card | Shows hierarchy + raid readiness |
| Card detail level | Compact (name, class, level, race, role, PvP rank, online dot) | Scannable; link to armory for deep dive |
| Data fetching | Build-time only (SSG) | Cloudflare-friendly, simplest, no runtime risk |
| Filtering | Class icon filter bar (fade non-matches to 15% opacity) | Visual, avoids layout shifts |
| Fallback (armory down) | Sanity-only data (name, realm, rank) | Build still succeeds, graceful degradation |

---

## Architecture

### Data Pipeline

1. **Sanity CMS** stores the member list: `name`, `realm`, `guildRank` (gm/officer/raider/member), `role` (tank/healer/dps), optional `notes`
2. **Build time**: Page fetches Sanity member list, then for each member calls `turtlecraft.gg/armory/{realm}/{name}` to extract character data via Livewire snapshot
3. **Enriched data**: Merges Sanity fields (rank, role) with armory data (class, race, level, PvP rank, online status)
4. **Fallback**: If any individual armory fetch fails, that member renders with Sanity-only data

### Component Tree

```
RosterPage (server)
  └─ RosterClient (client — handles class filtering)
       ├─ ClassFilter (row of class icon buttons)
       └─ RankGroup × N
            └─ MemberCard × N
```

Only `RosterClient` and below are client components (for filter interactivity). Data fetching and armory extraction stay server-side.

### Sanity Schema: `member`

```ts
{
  name: 'member',
  type: 'document',
  fields: [
    { name: 'characterName', type: 'string', validation: required },
    { name: 'realm', type: 'string', initialValue: 'Ambershire' },
    { name: 'guildRank', type: 'string', options: ['gm', 'officer', 'raider', 'member'] },
    { name: 'role', type: 'string', options: ['tank', 'healer', 'dps'] },
    { name: 'notes', type: 'text' },  // optional, not displayed on roster
  ]
}
```

### Armory Fetch Utility

```ts
async function fetchCharacterData(realm: string, name: string): Promise<CharacterData | null> {
  // GET https://turtlecraft.gg/armory/{realm}/{name}
  // Extract wire:snapshot attribute from HTML
  // Decode HTML entities, parse JSON
  // Return snapshot.data.character[0] or null on failure
}
```

Returns `null` on any error (Cloudflare block, timeout, missing snapshot). Caller handles gracefully.

---

## Visual Design

### Concept: Guild Hall Roster Board

The roster page feels like an engraved plaque on a tavern wall. Class colors provide the one splash of non-gold color on the site, making the roster feel alive.

### Page Layout

```
[Navbar]

  ◇ Guild Roster ◇              ← text-shimmer heading
  "XX members strong"           ← member count, text-muted

  [All] ● ● ● ● ● ● ● ● ●     ← class filter bar

  ━━━━ ◆ Guild Master ◆ ━━━━
  [======= Wide GM Card =======]

  ━━━━━ ◆ Officers ◆ ━━━━━━
  [Card] [Card] [Card]

  ━━━━━ ◆ Raiders ◆ ━━━━━━━
  [Card] [Card] [Card] [Card]

  ━━━━━ ◆ Members ◆ ━━━━━━━
  [Card] [Card]

[Footer]
```

### Member Card

Compact glassmorphism card with class-color identity:

- `glass-card` base styling
- **3px left border** in WoW class color (Druid `#FF7C0A`, Warrior `#C69B6D`, etc.)
- **Hover**: class-colored `box-shadow` glow replaces the default gold glow
- **Online dot**: green circle before class icon when `online === 1`
- **Name**: `font-heading` (Cinzel), bold, links to armory page
- **Level**: right-aligned, muted gold
- **Row 2**: `{Race} {Class} · {Role}` in `text-muted`
- **Row 3**: PvP rank title in `text-gold` (omitted if none)

**Fallback card** (no armory data): name, realm, guild rank only. "View on Armory →" link. No class color accent.

**Guild Master card**: spans 2 grid columns, subtle `glowPulse` gold shimmer border.

### WoW Class Colors

```ts
const CLASS_COLORS = {
  warrior:  '#C69B6D',
  paladin:  '#F48CBA',
  hunter:   '#AAD372',
  rogue:    '#FFF468',
  priest:   '#FFFFFF',
  shaman:   '#0070DD',
  mage:     '#3FC7EB',
  warlock:  '#8788EE',
  druid:    '#FF7C0A',
} as const
```

### Class Filter Bar

- "All" text pill + 9 circular class-color buttons with small SVG icons inside
- **Inactive**: 40% opacity, no glow
- **Hover**: full opacity, soft glow in class color
- **Active**: full opacity, `glowPulse` in class color, slight scale-up (1.1)
- Clicking filters by fading non-matching cards to 15% opacity (no layout shift)
- Clicking active class again returns to "All"

### Rank Section Dividers

- Rank name in `font-display` (Cinzel Decorative), `text-gold`, uppercase, tracking-widest
- Flanking horizontal rules: `border-gold/20`
- Diamond `◆` ornaments in `text-gold-light`
- If entire rank section is filtered out, section fades to 15% opacity

### Animations

- Staggered `fadeInUp` on page load — each card has increasing `animation-delay`
- Fade transitions on filter (opacity 1 ↔ 0.15, 300ms ease)
- Card hover: 300ms class-color glow transition

### Responsive Grid

| Breakpoint | Columns | GM Card |
|------------|---------|---------|
| Desktop (1024+) | 4 | Spans 2 |
| Tablet (768–1023) | 3 | Spans 2 |
| Mobile (<768) | 1 | Full width |

---

## Empty States

| State | Display |
|-------|---------|
| No members in Sanity | "The guild hall awaits its heroes..." + link to Sanity Studio |
| Sanity not configured | Static placeholder roster (3 fake members) for dev/preview |

---

## Navigation Changes

- **Navbar**: Add `{ href: '/roster', label: 'Roster' }` to `navLinks` array
- **Footer**: Add Roster to navigation links

---

## Files

### New Files
- `src/app/roster/page.tsx` — server page (data fetching)
- `src/components/RosterClient.tsx` — client wrapper (filtering state)
- `src/components/RosterClient.test.tsx` — tests
- `src/components/MemberCard.tsx` — compact member card
- `src/components/MemberCard.test.tsx` — tests
- `src/components/ClassFilter.tsx` — class filter bar
- `src/components/ClassFilter.test.tsx` — tests
- `src/components/RankGroup.tsx` — rank section with divider
- `src/components/RankGroup.test.tsx` — tests
- `src/lib/armory.ts` — turtlecraft.gg fetch utility
- `src/lib/armory.test.ts` — tests
- `src/lib/sanity/schemas/member.ts` — Sanity member schema
- `src/lib/classData.ts` — class colors, icons, names constants

### Modified Files
- `src/components/Navbar.tsx` — add Roster link
- `src/components/Navbar.test.tsx` — update test
- `src/components/Footer.tsx` — add Roster link
- `src/components/Footer.test.tsx` — update test
- `sanity/schema.ts` — register member schema

---

## Out of Scope

- Gear score / equipment display (use armory link instead)
- Profession details on card
- Talent spec on card
- In-game addon roster export
- Search / text filtering
- Sorting controls
