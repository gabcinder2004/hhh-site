# Phase 1: Enhanced Footer Design

## Context

The current footer is a single copyright line — `Happy Hour Heroes © 2026` — in a minimal `border-t` container. Every page ends abruptly. This upgrade turns the footer into a polished, functional site-wide element that reinforces guild identity and drives visitors to Discord.

## Design Decisions

1. **Primary goal**: Get visitors into the Discord server. The Discord button is the visual anchor.
2. **Layout**: Centered vertical stack — matches the Hero's centered aesthetic. No columns.
3. **Data**: Discord invite URL hardcoded as a module constant. No Sanity dependency.
4. **Component type**: Server component. No interactivity, no `'use client'`.
5. **Nav links**: Own array separate from Navbar (will diverge as Roster/History pages are added in later phases).

## Visual Concept: Bottom of a Tavern Scroll

The footer should feel like the closing moment of a scroll unfurling on a candlelit tavern table. Every element belongs in the Gilded Tavern aesthetic.

## Layout (All Screen Sizes)

```
┌─────────────────────────────────────────────┐
│                                             │
│  ──── ◆ ────     ornamental divider         │
│                                             │
│  [🎮 Join Our Discord]   gold gradient btn  │
│                                             │
│  Home · Raids · Gallery · About   nav links │
│                                             │
│  Chill Raids · Good People · Classic Vibes  │
│                                             │
│  Happy Hour Heroes © 2026       copyright   │
│                                             │
└─────────────────────────────────────────────┘
```

Fully centered, stacks naturally on mobile with no breakpoint changes needed.

## Visual Details

### Ornamental Divider
- Two gold gradient lines extending outward from a central diamond (same pattern as Hero.tsx lines 76-83)
- Tiny decorative crossbars at line endpoints (like scroll rod ends)
- Lines use `from-transparent via-gold/40 to-transparent` — glow from center outward

### Discord Button (Hero Element)
- Gold gradient: `bg-gradient-to-r from-gold to-gold-light`
- Dark text: `text-[#0d0b0e]`
- Inline Discord SVG icon (white/dark) alongside "Join Our Discord" text
- Subtle `box-shadow` glow that pulses gently using existing `glowPulse` animation
- Hover: `scale-105` + intensified glow shadow
- `target="_blank"` with `rel="noopener noreferrer"`
- `aria-label="Join our Discord server"`

### Nav Links (Understated)
- `font-heading` (Cinzel), small size, `tracking-[0.15em]`
- Gold middot (`·`) separators between links
- `text-muted` default → `hover:text-gold-light` transition
- No underlines
- Wrapped in `<nav aria-label="Footer navigation">`

### Tagline (Atmospheric)
- `font-body` (Outfit), italic, small, `text-muted/60`
- `tracking-[0.2em]` uppercase — matches Hero subtitle treatment
- "Chill Raids · Good People · Classic Vibes"

### Copyright (Minimal)
- `font-heading` at `text-xs`, `text-gold/30`
- `Happy Hour Heroes © {year}`

## Spacing Rhythm (Tapered Cadence)

Vertical gaps tighten progressively — the eye enters with space, the footer compresses as it closes:

| Between | Gap |
|---------|-----|
| Divider → Discord button | `gap-8` |
| Discord button → Nav links | `gap-6` |
| Nav links → Tagline | `gap-4` |
| Tagline → Copyright | `gap-3` |

## Background

Same as current: `bg-surface/30` with `border-t border-gold/10`. Subtle, doesn't compete with page content.

## Implementation

### Files Modified
- `src/components/Footer.tsx` — full rewrite
- `src/components/Footer.test.tsx` — updated tests

### No New Dependencies
- Discord SVG icon is inline (~200 bytes)
- No icon library needed
- No Sanity fetching

### Code Structure
```typescript
const DISCORD_INVITE = 'https://discord.gg/YOUR_INVITE_CODE'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/raids', label: 'Raids' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
]
```

### Future Phase Modifications
- Phase 2 (Roster): Add `{ href: '/roster', label: 'Roster' }` to `footerLinks`
- Phase 4 (Timeline): Add `{ href: '/history', label: 'History' }` to `footerLinks`
- One-line additions, no structural changes.

## Test Coverage
- Footer renders ornamental divider
- Discord link has correct `href`, `target="_blank"`, `rel="noopener noreferrer"`
- Discord link has accessible `aria-label`
- All four nav links render with correct `href` values
- Tagline text is present
- Copyright includes dynamic current year
- Footer nav is wrapped in `<nav aria-label="Footer navigation">`

## What We're NOT Adding (YAGNI)
- No social media icons beyond Discord
- No "Back to top" button (navbar is fixed)
- No newsletter/email capture
- No partner/sponsor logos
- No sitemap or legal links
