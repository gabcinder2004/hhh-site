## Why

A guild history timeline tells the story of who Happy Hour Heroes are — from founding to first raid clears to memorable moments. Method's "Raid History World First Timeline" is the gold standard for this concept, spanning every WoW expansion with embedded videos, precise dates, and curated articles. For a semi-casual guild, this serves a different but equally important purpose: building community identity, preserving memories, and showing recruits that this is a guild with history and personality.

## What Changes

- Add a new `/history` page with an interactive vertical timeline
- Each timeline entry is a milestone with date, title, description, optional screenshot/image, and optional tags
- Milestones managed via Sanity CMS for easy officer editing
- Scroll-driven animations — entries reveal as the user scrolls down
- Visual connection line running down the center (desktop) or left side (mobile)
- Support for different milestone types (founding, raid clear, event, achievement, funny moment)
- Add History link to navbar and footer

## Research Context

### Method's Raid History Timeline (the gold standard)
- Interactive scroll-through spanning every WoW expansion from Vanilla to current
- Each entry includes: guild that achieved World First, precise kill dates, embedded YouTube kill videos, curated articles (interviews, retrospectives)
- Inherited and upgraded the old Manaflask timeline data
- Even corrected historical records and discovered previously unknown World Firsts
- The key insight: **history told through data and media, not just text**

### Team Liquid's narrative approach
- "Get to Know the Guild" page documenting their journey from Complexity-Limit (2015) through the Team Liquid acquisition (2022)
- Contextualizes their 5x World First victories with team bios, gallery photos, and caster profiles
- The key insight: **narrative storytelling > data tables** for engagement

### Design patterns for timelines
- **Vertical alternating**: Entries alternate left/right of a center line (desktop). Classic and elegant.
- **Vertical left-aligned**: All entries on one side of a left-edge line. Simpler, works well mobile-first.
- **Horizontal scroll**: Entries scroll left-to-right. More unique but harder to implement well.
- **Parallax depth**: Background layers move at different speeds during scroll. Cinematic but performance-heavy.

### For our Gilded Tavern theme
- **Center-line timeline** on desktop, **left-aligned** on mobile
- Gold connecting line with diamond or dot markers at each milestone
- Glassmorphism cards for each entry (matching existing card style)
- Scroll-triggered `fadeInUp` animation (already exists in the CSS)
- Milestone type icons: sword (raid clear), shield (founding), beer mug (event), star (achievement), skull (funny wipe)
- Optional embedded images using Sanity image CDN

### Content structure via Sanity
```
Milestone document:
- title: string (e.g., "Guild Founded on Ambershire")
- date: date
- description: portableText (rich text with links, formatting)
- type: enum [founding, raid_clear, event, achievement, social, funny]
- image: optional Sanity image
- order: number (for manual ordering within same date)
```

### Scroll-driven animations
- CSS `scroll-driven animations` (modern browsers) or Intersection Observer API for broader support
- Each milestone card starts invisible and fades in + slides up when it enters the viewport
- The connecting line could animate its height as the user scrolls
- Performance note: CSS scroll-driven animations are more performant than JS-based solutions

### What makes a great guild timeline
1. **Mix of serious and fun**: First raid clears alongside "that time someone pulled the boss during a bio break"
2. **Screenshots and media**: Visual memories > text descriptions
3. **Guild personality**: MS Paint recreations, inside jokes, memorable quotes
4. **Chronological but grouped**: Group by expansion/era for natural sections
5. **Living document**: Easy for officers to add new milestones as they happen

## Capabilities

### New Capabilities

- `guild-timeline`: New `/history` page with a vertical scrolling timeline of guild milestones
- `timeline-entry`: Individual milestone card component with date, title, description, type icon, optional image, and scroll-reveal animation
- `sanity-milestone-schema`: New Sanity document type for timeline milestones

### Modified Capabilities

- `site-layout`: Add "History" link to navbar and footer navigation

## Impact

- **New files**: History page, timeline components, Sanity milestone schema, milestone queries
- **Modified files**: Navbar, Footer (new nav link)
- **Client-side JavaScript**: Intersection Observer or CSS scroll-driven animations for reveal effects
- **No new npm dependencies** (native browser APIs)
- **Sanity schema addition**: New `milestone` document type
- **Content creation**: Officers will need to populate initial timeline data (founding date, key moments)
