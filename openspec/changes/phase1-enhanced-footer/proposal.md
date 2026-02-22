## Why

The current footer is a single line — `Happy Hour Heroes (c) 2026` — in a `border-t` container. Every page on the site ends abruptly. Top WoW guild websites (Method, Liquid, Echo) treat the footer as a persistent navigation and identity element: quick links, social/Discord presence, recruitment CTAs, and guild branding. An enhanced footer turns dead space into a functional, polished site-wide element that reinforces guild identity on every page.

## What Changes

- Replace the minimal copyright-only footer with a multi-section footer
- Add quick navigation links (mirroring navbar: Home, Raids, Gallery, About)
- Add a Discord invite button/link (already stored in Sanity `guildInfo.discordLink`)
- Add a recruitment CTA linking to the About/Join page (or future recruitment page)
- Add guild motto/tagline ("Chill Raids - Good People - Classic Vibes")
- Maintain the Gilded Tavern aesthetic — gold accents, glassmorphism, ornamental dividers
- Keep it responsive (stacked on mobile, multi-column on desktop)

## Research Context

### What top guilds do with footers
- **Method.gg**: Full footer with social links (Twitch, X, YouTube, Discord), partner logos, quick nav, and legal links. Dark background matching site theme.
- **Echo**: Clean footer with social icons, merch store link, and brand logo. Uses same Montserrat/Source Sans Pro typography as the rest of the site.
- **Team Liquid**: Multi-column footer with game sections, social links, partner section, and legal.

### Design patterns that work
- **Multi-column layout**: 2-3 columns on desktop collapsing to stacked on mobile
- **Ornamental dividers**: Gold line separators matching the site's existing divider pattern (see Hero.tsx diamond divider)
- **Social/Discord prominence**: Discord is the primary community hub — footer should make it easy to find
- **Recruitment is always visible**: A persistent "Join Us" or "Recruiting" link in the footer catches visitors who scroll to the bottom

### What to avoid
- Cluttered sidebars or widget dumps
- External partner/sponsor logos (not relevant for a semi-casual guild)
- Excessive legal text

## Capabilities

### Modified Capabilities

- `site-layout`: Update the Footer component from a single-line copyright to a multi-section footer with navigation, Discord link, recruitment CTA, and guild branding

## Impact

- **Files modified**: `src/components/Footer.tsx`, `src/components/Footer.test.tsx`
- **Data sources**: Existing `guildInfo` Sanity document (discordLink field already exists)
- **No new dependencies**
- **No new pages or routes**
