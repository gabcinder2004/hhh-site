## Why

TurtleWoW releases custom content patches and raids on a regular cadence. A countdown timer creates anticipation and gives guild members a reason to check the site. When the countdown reaches zero, it transitions into a "LIVE NOW" state that can link to the raid progress page. This is a pattern used by top guilds during Race to World First events — Method and Liquid both use launch-day dashboards that build hype.

## What Changes

- Add a countdown component that can be placed on the homepage or as a standalone banner
- Support a target date/time managed via Sanity CMS
- Display days, hours, minutes, seconds with animated tick-down
- Transition to a "LIVE NOW" or "Available Now" state when countdown reaches zero
- Include the content release name/title and optional description
- Support an optional link (e.g., to raid progress page or TurtleWoW patch notes)
- Can be hidden/disabled when no upcoming release is scheduled

## Research Context

### How top guilds handle launch events
- **Method**: During Race to World First, their homepage transforms into a live dashboard with embedded streams, real-time progress tracking, and a countdown/timer showing raid unlock times. The transition from "countdown" to "live" is seamless.
- **Team Liquid**: Similar approach — countdown to raid release, then live progression tracker with skull/sword icons for killed/in-progress bosses
- **General pattern**: Countdown → Live state → Post-event recap

### Design patterns for countdowns
- **Flip-clock style**: Individual digit cards that flip/animate on change (classic but can feel dated)
- **Segmented digits**: Large numbers in separate boxes with labels (Days, Hours, Minutes, Seconds)
- **Minimal inline**: Just text with numbers updating — fits cleaner designs
- **Ring/circular**: Progress rings counting down — modern but more complex

### For our Gilded Tavern theme
- Gold-accented digit boxes on a dark surface with subtle glow
- MedievalSharp or Cinzel font for the countdown numbers
- Ornamental dividers matching the Hero component's diamond divider pattern
- Subtle gold pulse/glow animation on the "LIVE NOW" state
- Could use the existing `glowPulse` animation from the CSS

### Content management via Sanity
- **Countdown document type**: title, targetDate (datetime), description (optional), linkUrl (optional), linkLabel (optional), active (boolean)
- Only one countdown should be active at a time (or show the nearest upcoming)
- When `targetDate` is in the past, auto-switch to "available now" display
- When no active countdown exists, the component simply doesn't render

### Placement options
- **Homepage hero section**: Below the subtitle, above the "Join Us" CTA
- **Sticky banner**: Top of page, above navbar (dismissible)
- **Dedicated section**: Below the hero, above the news feed
- **All pages**: Small banner visible site-wide

## Capabilities

### New Capabilities

- `countdown-component`: Client-side countdown timer with animated digit display, "LIVE NOW" transition, and auto-hide when no active countdown
- `sanity-countdown-schema`: New Sanity document type for managing countdown events (title, targetDate, description, link, active flag)

### Modified Capabilities

- `news-feed`: Homepage layout updated to include countdown section when an active countdown exists

## Impact

- **New files**: Countdown component, Sanity countdown schema, countdown query
- **Modified files**: Homepage (`app/page.tsx`) to conditionally render countdown
- **Client-side JavaScript**: `'use client'` component for real-time countdown tick
- **No new dependencies**
- **Sanity schema addition**: New `countdown` document type
