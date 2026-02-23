## Why

A member roster is the core identity feature of any guild website. It answers "who are these people?" for recruits and gives members a sense of belonging. Currently the site only shows officers on the About page. A dedicated roster page with live character data transforms the site from a content-only portal into a living representation of the guild.

## What Changes

- Add a new `/roster` page displaying all guild members grouped by guild rank
- Create a Sanity CMS schema for guild members (character name, realm, rank, role)
- Build a data pipeline to fetch character details from turtlecraft.gg armory at build time
- Display compact member cards with class icon, level, race, role, PvP rank, and online status
- Add a class icon filter bar that fades non-matching members
- Add Roster link to navbar and footer navigation
- Gracefully degrade to Sanity-only data when armory is unreachable

## Capabilities

### New Capabilities

- `member-roster`: Roster page with guild rank sections, compact member cards, class filtering, and staggered reveal animations
- `armory-integration`: Server-side data pipeline to extract character data from turtlecraft.gg Livewire snapshots at build time
- `sanity-member-schema`: Sanity document type for guild members with character name, realm, guild rank, role, and notes

### Modified Capabilities

- `site-layout`: Add "Roster" link to navbar and footer navigation arrays

## Impact

- **New files**: Roster page, RosterClient, MemberCard, ClassFilter, RankGroup components + tests, armory fetch utility + tests, Sanity member schema, class data constants
- **Modified files**: Navbar.tsx, Footer.tsx (add Roster nav link), sanity/schema.ts (register member schema)
- **External dependency**: HTTP requests to turtlecraft.gg at build time (no runtime dependency)
- **No new npm packages**: Uses native `fetch` API
