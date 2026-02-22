## Why

Happy Hour Heroes needs a public-facing guild website to showcase raid progress, share screenshots, and post news about guild events and competitions. Currently there's no central place outside Discord for members and recruits to see what the guild is about and what they've accomplished. A dedicated site gives the guild a persistent, shareable identity on the web.

## What Changes

- Create a new Next.js website from scratch with four pages: Home, Raid Progress, Gallery, and About/Join
- Integrate Sanity headless CMS so the guild master can publish content without touching code
- Implement a blog-style news feed on the home page for raid kills, event recaps, and announcements
- Build a visual raid progress tracker showing boss kills per raid tier
- Build a screenshot gallery with masonry grid layout, lightbox, and tag filtering
- Build an about/join page with guild info and Discord link
- Deploy on Vercel with automatic rebuilds on Sanity content publish

## Capabilities

### New Capabilities

- `project-setup`: Next.js project scaffolding with TypeScript, Tailwind CSS, and Sanity integration
- `site-layout`: Shared layout with fixed navbar, footer, responsive mobile menu, and dark theme with guild tabard colors (navy, royal blue, gold, white)
- `news-feed`: Blog-style post system — list view on home page with category tags, thumbnails, and previews; full post pages at `/news/[slug]` with rich text and embedded images
- `raid-progress`: Visual raid progression tracker — per-raid cards with progress bars, boss kill lists with status indicators, collapsible older tiers
- `gallery`: Screenshot gallery — masonry grid, lightbox viewer with prev/next, tag-based filtering, image CDN optimization
- `about-page`: Guild info page — editable description, Discord join button, optional officer list
- `sanity-cms`: Sanity content schemas (Post, Raid, Boss, GalleryImage, GuildInfo) and Studio configuration for non-technical content management

### Modified Capabilities

(none — greenfield project)

## Impact

- **New codebase**: Entire Next.js application created from scratch
- **External services**: Sanity project (free tier) for CMS, Vercel (free tier) for hosting
- **Dependencies**: Next.js, React, Tailwind CSS, Sanity client libraries, image optimization packages
- **Deployment**: Vercel with Sanity webhook for automatic rebuilds on content publish
