## Context

The current footer is a 9-line server component rendering only `Happy Hour Heroes © {year}`. Every page ends abruptly. The footer lives in `src/components/Footer.tsx` and is rendered in the root `layout.tsx` as a static server component with no data dependencies.

The site uses the Gilded Tavern theme: dark backgrounds (#0d0b0e), gold accents (#c9a84c / #f5d978), glassmorphism cards, MedievalSharp (display), Cinzel (headings), and Outfit (body) fonts. The Hero component establishes visual patterns we should echo — centered layout, ornamental diamond dividers, gold gradient CTAs, and shimmer animations.

Discord is the guild's primary community hub. The footer's #1 job is driving visitors to the Discord server.

## Goals / Non-Goals

**Goals:**
- Replace copyright-only footer with a multi-section centered vertical stack
- Make the Discord invite the visual anchor of the footer
- Echo the Hero's ornamental divider pattern for visual bookending
- Keep it a server component with no external data dependencies
- Maintain full mobile responsiveness without breakpoint-specific layout changes

**Non-Goals:**
- Fetching data from Sanity CMS (Discord link is hardcoded)
- Adding social media links beyond Discord
- Adding a "back to top" button
- Newsletter signup or email capture
- Partner/sponsor logos
- Making the footer a client component

## Decisions

### 1. Hardcoded Discord invite URL

**Decision:** Store the Discord invite URL as a module-level constant in Footer.tsx.

**Why:** The Discord invite rarely changes. Hardcoding avoids adding a Sanity fetch to the root layout, keeps the footer a pure server component, and eliminates the "Sanity not configured" fallback path. If the URL ever needs to change, it's a one-line code edit.

**Alternative considered:** Fetching from Sanity `guildInfo.discordLink` — adds complexity (async layout, error handling, fallback) for a value that changes once a year at most.

### 2. Centered vertical stack layout

**Decision:** All footer content is centered and vertically stacked. No columns at any breakpoint.

**Why:** Matches the Hero's centered aesthetic. The content volume is small enough that columns would create awkward whitespace. A centered stack is inherently responsive — it works identically on mobile and desktop with no breakpoint logic.

**Alternative considered:** Two-column (branding left, links right) — more traditional but fights the site's centered design language. Three-column — too corporate for a semi-casual guild.

### 3. Separate footerLinks array from Navbar navLinks

**Decision:** Footer has its own `footerLinks` array rather than importing from Navbar.

**Why:** These arrays will diverge as we add pages in later phases (Roster in Phase 2, History in Phase 4). The footer may also eventually include links the navbar doesn't (e.g., loot rules, external resources). Keeping them separate avoids coupling.

### 4. Inline Discord SVG icon

**Decision:** Embed the Discord logo SVG directly in the component (~200 bytes).

**Why:** Avoids adding an icon library dependency for a single icon. The SVG is small and renders immediately with no network request. Matches the site's pattern of inline SVGs (see Hero.tsx shield crest).

### 5. Tapered spacing rhythm

**Decision:** Vertical gaps decrease progressively: gap-8 → gap-6 → gap-4 → gap-3.

**Why:** Creates a visual "closing" effect — the eye enters the footer with generous space and the content compresses as it reaches the copyright line, like a scroll rolling shut. This is a deliberate design choice, not default equal spacing.

## Risks / Trade-offs

**Discord invite URL staleness** → If the guild creates a new Discord server or the invite expires, someone must update the constant in code and redeploy. Mitigated by using a permanent Discord invite link (never expires).

**Nav link duplication** → footerLinks and navLinks are maintained separately, so adding a new page requires updating both. Mitigated by the fact that new pages are infrequent (only 2 planned: Roster and History) and each is a one-line addition.

**No dynamic content** → The footer is fully static. If the guild later wants to show "X members online" or dynamic recruitment status, this would need to become a client component. Acceptable trade-off for simplicity now.
