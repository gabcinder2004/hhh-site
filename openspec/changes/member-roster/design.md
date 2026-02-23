## Context

The HHH guild website currently shows officers on the About page but has no dedicated member roster. Phase 2 adds a `/roster` page with live character data from turtlecraft.gg. The site uses Next.js 16 (App Router), Sanity CMS, Tailwind v4, and follows the Gilded Tavern dark-fantasy theme.

turtlecraft.gg has no official API but embeds complete character data in Laravel Livewire `wire:snapshot` attributes on every armory page. There is no guild roster endpoint — members must be manually listed in Sanity and enriched individually.

## Goals / Non-Goals

**Goals:**
- Display all guild members on a dedicated `/roster` page grouped by guild rank
- Enrich Sanity member entries with live armory data (class, race, level, PvP rank, online status)
- Provide class-based visual filtering
- Gracefully degrade when armory data is unavailable
- Match the Gilded Tavern aesthetic with class-color accents as the visual hook

**Non-Goals:**
- Gear score, equipment details, or talent specs on the roster (link to armory instead)
- Real-time / ISR data fetching (build-time only)
- Automated guild roster discovery (manual Sanity entry)
- Search or text filtering
- Sorting controls

## Decisions

### 1. Build-time SSG over ISR or client-side fetching
**Choice**: Fetch armory data during `next build` only.
**Alternatives**: ISR with revalidation, client-side fetching with SWR.
**Rationale**: turtlecraft.gg has Cloudflare protection. Minimizing request volume avoids blocks. Guild rosters don't change frequently — a redeploy handles updates. Simplest implementation with no runtime failure modes.

### 2. Fade filtering over remove filtering
**Choice**: Non-matching members fade to 15% opacity instead of being removed from the DOM.
**Alternatives**: Hide with `display: none`, filter and re-render.
**Rationale**: Guild size is 20-40 members. Removing cards causes layout shifts. Fading keeps spatial layout stable and feels smoother. Users still see the full roster shape.

### 3. Server component page with client filter wrapper
**Choice**: `RosterPage` (server) fetches and serializes data. `RosterClient` (client) manages filter state. `MemberCard`, `ClassFilter`, `RankGroup` are presentational client components.
**Alternatives**: Fully server-rendered with URL-based filtering, fully client-side.
**Rationale**: Filter interaction needs client state. Data fetching benefits from server context. Splitting at the boundary keeps the client bundle minimal while enabling interactivity.

### 4. Class colors as the differentiator
**Choice**: Member cards get class-colored left borders and class-colored hover glows. This is the one non-gold color element on the site.
**Alternatives**: Uniform gold styling, class-colored backgrounds.
**Rationale**: WoW class colors are iconic and instantly recognizable. Using them as accents (not backgrounds) integrates with the Gilded Tavern theme without overwhelming it. Makes the roster page visually distinct from every other page.

### 5. Graceful fallback per-member
**Choice**: If an individual armory fetch fails, that member renders with Sanity-only data (name, realm, rank). Build does not fail.
**Alternatives**: Fail the entire build, skip the member entirely, use cached data.
**Rationale**: A single Cloudflare block or timeout shouldn't prevent deployment. Sanity-only cards still show the member exists. The armory link lets users check manually.

## Risks / Trade-offs

- **Cloudflare blocking** → Mitigation: Build-time only (low request volume), sequential fetches with delays, graceful per-member fallback
- **Livewire snapshot format changes** → Mitigation: Extraction utility is isolated in `src/lib/armory.ts` with comprehensive tests; easy to update regex/parsing
- **Manual roster maintenance** → Mitigation: Sanity schema is minimal (name + realm + rank); officers update it. Future phases could add addon-based export
- **Stale data between deploys** → Mitigation: Acceptable for a semi-casual guild. Webhook-triggered redeploys (Phase 5 deployment) will improve freshness
