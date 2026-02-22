## 1. Project Setup

- [x] 1.1 Initialize Next.js project with TypeScript and App Router (`create-next-app`)
- [x] 1.2 Install and configure Tailwind CSS v4 with custom guild theme colors (navy `#0a0e1a`, royal blue `#1e3a6e`, gold `#d4a843`, off-white `#f0f0f0`)
- [x] 1.3 Install and configure Vitest with React Testing Library and jsdom environment
- [x] 1.4 Install Sanity client library (`next-sanity`) and create `src/lib/sanity/client.ts` with environment variable config
- [x] 1.5 Create `.env.local.example` with required Sanity environment variables
- [x] 1.6 Set up project directory structure per design (`src/app/`, `src/components/`, `src/lib/sanity/`, `src/__tests__/`)

## 2. Sanity CMS Schemas & Queries

- [x] 2.1 Create Sanity project and configure dataset (via `sanity init` or Sanity dashboard)
- [x] 2.2 Define Post schema (title, slug, author, date, category enum, thumbnail, body portable text, published boolean)
- [x] 2.3 Define Raid schema (name, order number, bosses array with inline objects: name, killed, killDate, killScreenshot)
- [x] 2.4 Define GalleryImage schema (image, caption, date, tags array, uploadedBy)
- [x] 2.5 Define GuildInfo singleton schema (description portable text, discordLink, officers array)
- [x] 2.6 Create TypeScript types for all Sanity document types in `src/lib/sanity/types.ts`
- [x] 2.7 Write GROQ queries in `src/lib/sanity/queries.ts` (posts by date, post by slug, raids by order, gallery images with tag filter, guild info singleton)
- [x] 2.8 Write tests for GROQ query helper functions

## 3. Site Layout

- [x] 3.1 Write tests for Navbar component (renders guild name, page links, active link highlighting)
- [x] 3.2 Implement Navbar component with fixed positioning, guild name left, links right
- [x] 3.3 Write tests for mobile hamburger menu (opens/closes, shows links)
- [x] 3.4 Implement mobile responsive navigation with hamburger menu (below 768px)
- [x] 3.5 Write tests for Footer component (renders guild name and year)
- [x] 3.6 Implement Footer component
- [x] 3.7 Create root layout (`src/app/layout.tsx`) wrapping all pages with Navbar, Footer, dark theme globals, and font configuration

## 4. Home Page — Hero Section

- [x] 4.1 Write tests for Hero component (renders guild name, tagline, CTA button linking to /about)
- [x] 4.2 Implement Hero component with full-width dark banner, guild name heading, "Alliance & Horde · TurtleWoW" tagline, and CTA button

## 5. Home Page — News Feed

- [x] 5.1 Write tests for PostCard component (renders title, date, author, category tag, preview text, thumbnail conditionally, links to /news/[slug])
- [x] 5.2 Implement PostCard component
- [x] 5.3 Write tests for home page news feed (renders list of post cards newest first, empty state)
- [x] 5.4 Implement home page (`src/app/page.tsx`) with Hero and news feed fetching posts from Sanity

## 6. Full Post Page

- [x] 6.1 Write tests for full post page (renders title, date, author, category, body content, 404 for invalid slug)
- [x] 6.2 Implement full post page (`src/app/news/[slug]/page.tsx`) with `generateStaticParams` for static generation
- [x] 6.3 Set up portable text rendering for post body content (Sanity `@portabletext/react`)

## 7. Raid Progress Page

- [x] 7.1 Write tests for BossRow component (killed state with gold checkmark and date, unkilled state dimmed)
- [x] 7.2 Implement BossRow component
- [x] 7.3 Write tests for RaidTier component (renders raid name, progress bar with kill ratio, boss list, collapse/expand behavior)
- [x] 7.4 Implement RaidTier component with progress bar and collapsible boss list
- [x] 7.5 Write tests for raid progress page (renders raid tiers ordered by recency, most current expanded, older collapsed, empty state)
- [x] 7.6 Implement raid progress page (`src/app/raids/page.tsx`) fetching raids from Sanity

## 8. Gallery Page

- [x] 8.1 Write tests for TagFilter component (renders tag buttons including "All", clicking filters selection)
- [x] 8.2 Implement TagFilter component
- [x] 8.3 Write tests for GalleryGrid component (renders images in grid, displays caption and uploadedBy)
- [x] 8.4 Implement GalleryGrid component with masonry layout (3 col desktop, 2 tablet, 1 mobile)
- [x] 8.5 Write tests for Lightbox component (opens on image click, prev/next navigation, close on button/Escape)
- [x] 8.6 Implement Lightbox component with overlay, navigation, and keyboard support
- [x] 8.7 Write tests for gallery page (renders grid with images, tag filtering, empty state)
- [x] 8.8 Implement gallery page (`src/app/gallery/page.tsx`) fetching images from Sanity with tag filtering

## 9. About / Join Page

- [x] 9.1 Write tests for about page (renders guild description, Discord button conditionally, officer list conditionally)
- [x] 9.2 Implement about page (`src/app/about/page.tsx`) fetching guild info from Sanity
- [x] 9.3 Set up portable text rendering for guild description

## 10. Deployment

- [ ] 10.1 Configure Vercel project and connect Git repository
- [ ] 10.2 Set Sanity environment variables in Vercel project settings
- [ ] 10.3 Create Vercel deploy hook and configure Sanity webhook for automatic rebuild on content publish
- [ ] 10.4 Verify production build and deployment
