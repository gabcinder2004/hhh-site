# Happy Hour Heroes — Guild Website Design

## Overview

A modern, clean guild website for **Happy Hour Heroes**, an Alliance & Horde guild on **TurtleWoW** (vanilla WoW private server). The site serves as a public-facing showcase for raid progress, screenshots, and guild news — with a blog-style home feed as the central hub.

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | **Next.js** (React + API routes) | Full-stack React framework |
| CMS | **Sanity** | Headless CMS for non-technical content editing |
| Styling | **Tailwind CSS** | Utility-first CSS framework |
| Hosting | **Vercel** | Deployment and hosting (free tier) |

### Dual Content Workflow

- **Developer (you):** Push code changes, edit content via code, full control
- **Guild Master:** Logs into Sanity Studio, writes posts in a visual editor, hits publish — site rebuilds automatically via Vercel webhook

## Color Palette

Derived from the guild tabard (royal blue, white, gold).

| Role | Color | Hex |
|------|-------|-----|
| Background (dark navy) | ![#0a0e1a](https://via.placeholder.com/12/0a0e1a/0a0e1a) | `#0a0e1a` |
| Primary accent (royal blue) | ![#1e3a6e](https://via.placeholder.com/12/1e3a6e/1e3a6e) | `#1e3a6e` |
| Secondary accent (gold/amber) | ![#d4a843](https://via.placeholder.com/12/d4a843/d4a843) | `#d4a843` |
| Text (off-white) | ![#f0f0f0](https://via.placeholder.com/12/f0f0f0/f0f0f0) | `#f0f0f0` |
| Highlights (white) | ![#ffffff](https://via.placeholder.com/12/ffffff/ffffff) | `#ffffff` |

## Pages

### 1. Home (`/`)

The main hub — first impression for visitors, daily check-in for members.

**Hero Section:**
- Full-width dark banner
- Guild name "Happy Hour Heroes" in large bold typography
- Tagline: "Alliance & Horde · TurtleWoW"
- Subtle background (screenshot, dark texture, or gradient with blue/gold accents)
- CTA button linking to Discord or About/Join page

**News Feed:**
- Vertical list of blog-style post cards, newest first
- Each card displays:
  - Title
  - Date and author (character name)
  - Category tag (Raid Kill, Event, Announcement, Competition, etc.)
  - Thumbnail image (optional)
  - Short preview text
  - Click-through to full post page

**Full Post Page (`/news/[slug]`):**
- Complete post with rich text
- Embedded screenshots
- Category and date metadata

### 2. Raid Progress (`/raids`)

Visual at-a-glance view of guild raid progression.

**Per Raid Tier (card/section):**
- Raid name and icon (e.g., "Molten Core", "Blackwing Lair")
- Progress bar — e.g., "8/10" with gold fill showing percentage
- Boss list with status indicators:
  - Killed: gold checkmark + kill date
  - Not killed: dimmed/grey
- Optional kill screenshot thumbnail (links to gallery)

**Behavior:**
- Most current raid tier at the top
- Older tiers collapsible to keep the page clean
- Sanity schema: list of raids, each with bosses. GM toggles kills, adds dates and screenshots.

### 3. Gallery (`/gallery`)

Screenshot showcase for raid kills, events, funny moments, memories.

**Layout:**
- Masonry grid (Pinterest-style staggered layout)
  - 3 columns desktop, 2 tablet, 1 mobile
- Lightbox on click — full-size overlay with prev/next navigation
- Filter tags at the top ("Raid Kills", "Events", "PvP", "Memes", etc.)

**Per Image:**
- Optional caption
- Date
- Tags
- Uploaded by (character name)

**Performance:**
- Images served via Sanity's image CDN with automatic resizing/optimization

**Sanity workflow:** Upload images, add caption and tags, publish. Batch uploads supported.

### 4. About / Join (`/about`)

Simple "who we are" page.

**Content:**
- Guild description — a few paragraphs about Happy Hour Heroes, casual tone, both factions, TurtleWoW
- How to join — short instructions + prominent Discord invite button
- Optional officer list (names and roles)

All editable through Sanity.

## Navigation

- Fixed top navbar
- Guild name / logo on the left
- Page links on the right: Home, Raids, Gallery, About
- Mobile: hamburger menu
- Clean, minimal styling

## Sanity Content Types

| Content Type | Key Fields |
|-------------|------------|
| **Post** | title, slug, author, date, category, thumbnail, body (rich text), published |
| **Raid** | name, icon, order, bosses[] |
| **Boss** | name, killed (boolean), killDate, killScreenshot |
| **GalleryImage** | image, caption, date, tags[], uploadedBy |
| **GuildInfo** | description (rich text), discordLink, officers[] |

## Design Principles

- **Dark theme** with blue/gold accents from the tabard
- **Modern and clean** — no clutter, generous whitespace, sharp typography
- **Screenshot-friendly** — dark backgrounds make game screenshots pop
- **Mobile-first responsive** — looks good on phones for quick checks
- **Fast** — static generation where possible, image CDN for media
- **Simple content management** — GM can post without touching code

## Implementation Notes

- Use **OpenSpec** and **Beads** for implementation workflow
- Follow **TDD approach** throughout development
- Sanity Studio can be embedded in the Next.js app or hosted separately
- Vercel webhook triggers rebuild on Sanity content publish
- Free tiers of Vercel and Sanity cover all needs for a guild site
