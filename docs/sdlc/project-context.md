# Project Context

## What Is This?

**Happy Hour Heroes** (HHH) is the guild website for a TurtleWoW (vanilla WoW private server) guild. It serves as a public-facing showcase for raid progress, screenshots, and guild news — with a blog-style home feed as the central hub.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.x |
| UI Library | React | 19.x |
| Styling | Tailwind CSS | v4 |
| CMS | Sanity (headless) | next-sanity 12.x |
| Testing | Vitest + Testing Library | Vitest 4.x |
| Linting | ESLint | 9.x |
| Hosting | Vercel | Free tier |

## Architecture

### App Router Structure
```
src/app/
  layout.tsx          # Root layout (fonts, Navbar, Footer)
  page.tsx            # Home — hero + news feed
  globals.css         # Gilded Tavern theme (CSS vars, animations)
  news/[slug]/        # Individual post pages
  raids/              # Raid progress page
  gallery/            # Screenshot gallery
  about/              # Guild info + join CTA
```

### Component Model
- **Server components** by default (no `'use client'` unless interactivity required)
- **Client components** only for: lightbox, tag filtering, mobile nav toggle
- Components live in `src/components/` with co-located `.test.tsx` files

### Sanity Data Model
| Content Type | Purpose |
|-------------|---------|
| Post | News/blog posts with rich text |
| Raid / Boss | Raid progression tracking |
| GalleryImage | Screenshot gallery entries |
| GuildInfo | About page content |

Sanity schemas live in `sanity/`. Sanity Studio can be embedded or hosted separately.

## Design System — The Gilded Tavern

### Theme
Dark fantasy tavern aesthetic. Dark backgrounds make game screenshots pop.

### Colors (CSS custom properties in `globals.css`)
| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#0d0b0e` | Page background |
| `--surface` | `#1e1a24` | Card/panel backgrounds |
| `--foreground` | `#e8e2d6` | Body text |
| `--gold` | `#c9a84c` | Primary accent |
| `--gold-light` | `#f5d978` | Highlight accent |
| `--accent-blue` | `#3d5a8a` | Secondary accent |
| `--muted` | `#7a7068` | Subdued text |

### Fonts
| Token | Font | Usage |
|-------|------|-------|
| `font-display` | MedievalSharp | Guild name, decorative headings |
| `font-heading` | Cinzel | Section headings, nav links |
| `font-sans` | Outfit | Body text |
| `font-mono` | JetBrains Mono | Code snippets |

### Key CSS Classes
- `.glass-card` — Glassmorphism panel with gold border hover
- `.text-shimmer` — Animated gold gradient text
- `.animate-fade-in-up` — Entrance animation
- `glowPulse` keyframe — Subtle gold glow pulsation

## Key Directories

```
/                       # Project root
  CLAUDE.md             # SDLC routing table (always loaded)
  AGENTS.md             # Beads quick reference for agents
  docs/
    plans/              # Design documents (per-feature)
    sdlc/               # SDLC workflow documentation (this directory)
  openspec/
    changes/            # OpenSpec change artifacts
    specs/              # OpenSpec specifications
  src/
    app/                # Next.js App Router pages
    components/         # React components + co-located tests
    lib/                # Utilities, Sanity client, helpers
  sanity/               # Sanity schemas and config
  public/               # Static assets
```

## File Conventions

- Components: PascalCase (`Hero.tsx`, `RaidTier.tsx`)
- Tests: co-located with `.test.tsx` suffix (`Hero.test.tsx`)
- Pages: `page.tsx` inside route directories
- Design docs: `docs/plans/YYYY-MM-DD-<topic>-design.md`
