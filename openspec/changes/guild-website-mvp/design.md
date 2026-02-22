## Context

Greenfield Next.js application for the Happy Hour Heroes guild on TurtleWoW (vanilla WoW private server). No existing codebase — building from scratch. The site is content-driven (blog posts, raid data, screenshots) with two types of content editors: a developer who works in code and a guild master who needs a visual CMS interface.

The site is read-heavy with infrequent writes (a few posts per week, raid updates after progression nights). Traffic will be modest — guild members and potential recruits.

## Goals / Non-Goals

**Goals:**
- Fast, statically-generated pages that rebuild on content changes
- Non-technical guild master can create posts, update raid progress, and upload screenshots via Sanity Studio
- Developer can also manage content via code/markdown and push changes
- Mobile-friendly responsive design
- Dark theme derived from guild tabard colors (navy, royal blue, gold, white)
- TDD approach — tests written before implementation

**Non-Goals:**
- User authentication or member login
- Interactive features (comments, forums, polls)
- Real-time updates or WebSocket connections
- Custom Sanity Studio UI — use default Studio with custom schemas
- SEO optimization beyond basic meta tags
- Analytics or tracking

## Decisions

### 1. Next.js App Router with static generation

**Decision:** Use Next.js App Router (not Pages Router) with `generateStaticParams` for static site generation.

**Why:** App Router is the current standard for Next.js. Static generation means pages are pre-built at deploy time — fast loads, free hosting on Vercel, no server costs. Content updates trigger a rebuild via Sanity webhook + Vercel deploy hook.

**Alternative considered:** Pages Router — more documentation available but being phased out. App Router is the right choice for a new project.

### 2. Sanity v3 as headless CMS

**Decision:** Use Sanity v3 with the hosted Sanity Studio (studio.sanity.io) rather than embedding Studio in the Next.js app.

**Why:** Hosted Studio is zero-config — no additional routes, no auth to manage, no build complexity. The GM gets a clean editor at a separate URL. Free tier includes 100K API requests/month and 1GB asset storage, which is plenty for a guild site.

**Alternative considered:** Embedded Studio (Next.js route) — adds complexity to the app, requires auth setup, and mixes concerns. Not worth it for this use case.

**Alternative considered:** MDX files only — simpler but loses the non-technical editor workflow, which is a core requirement.

### 3. Tailwind CSS v4 for styling

**Decision:** Use Tailwind CSS for all styling. No component library (no shadcn, no MUI).

**Why:** Tailwind gives full design control with utility classes. A component library would impose its own design language, fighting against the custom dark theme. The site is simple enough that custom components are straightforward.

### 4. Project structure

**Decision:** Colocate components with their pages where possible. Shared components in `src/components/`.

```
src/
├── app/
│   ├── layout.tsx              # Root layout (navbar + footer)
│   ├── page.tsx                # Home (hero + news feed)
│   ├── news/[slug]/page.tsx    # Individual post
│   ├── raids/page.tsx          # Raid progress
│   ├── gallery/page.tsx        # Gallery
│   └── about/page.tsx          # About/Join
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── PostCard.tsx
│   ├── RaidTier.tsx
│   ├── BossRow.tsx
│   ├── GalleryGrid.tsx
│   ├── Lightbox.tsx
│   └── TagFilter.tsx
├── lib/
│   └── sanity/
│       ├── client.ts           # Sanity client config
│       ├── queries.ts          # GROQ queries
│       └── types.ts            # TypeScript types for Sanity documents
└── __tests__/                  # Test files mirroring src structure
```

### 5. Sanity schema design

**Decision:** Five document types in Sanity, kept flat and simple.

- **Post** — title, slug, author, date, category (enum), thumbnail, body (portable text), published flag
- **Raid** — name, order (for sorting), bosses (array of objects: name, killed, killDate, killScreenshot)
- **GalleryImage** — image, caption, date, tags (array of strings), uploadedBy
- **GuildInfo** — singleton document: description (portable text), discordLink, officers (array of objects: name, role)

**Why bosses are inline (not separate documents):** Bosses only exist within a raid context. Inline objects keep the editing experience simple — GM opens a raid, toggles boss kills. No cross-referencing needed.

### 6. Image handling

**Decision:** Use Sanity's image CDN (`cdn.sanity.io`) with URL-based transforms for responsive images.

**Why:** Sanity automatically serves images in optimal formats (WebP) with resize parameters in the URL. No need for Next.js Image optimization or a separate image service. Gallery images and post thumbnails both go through this pipeline.

### 7. Testing strategy

**Decision:** Vitest + React Testing Library for unit/component tests. No E2E tests for MVP.

**Why:** Vitest is faster than Jest and has native ESM support (better for Next.js App Router). Component tests verify rendering logic and user interactions. E2E tests (Playwright) are overkill for a content site with no user authentication or complex flows.

**What to test:**
- Components render correctly with mock data
- Navigation links point to correct routes
- Conditional rendering (killed vs not-killed bosses, empty states)
- Tag filtering logic in gallery
- Lightbox open/close/navigation behavior

### 8. Deployment pipeline

**Decision:** Vercel auto-deploys from Git. Sanity webhook triggers Vercel deploy hook on content publish.

**Flow:**
1. Developer pushes code → Vercel builds and deploys
2. GM publishes in Sanity → Webhook hits Vercel deploy hook → Vercel rebuilds with new content

No CI/CD pipeline beyond Vercel's built-in. Tests run locally (and can be added as a Vercel build step later).

## Risks / Trade-offs

**Static rebuild latency** → Content changes aren't instant (rebuild takes 30-60 seconds). Acceptable for a guild site where posts aren't time-critical. Could add ISR (Incremental Static Regeneration) later if needed.

**Sanity free tier limits** → 100K API requests/month, 1GB assets, 3 users. More than enough for a guild site. If the guild grows significantly, the next tier is $15/month.

**No preview mode** → GM can't preview posts before publishing. Could add Sanity preview integration later, but for MVP the Studio's built-in preview is sufficient.

**Dark theme accessibility** → Low-contrast dark UIs can be hard to read. Mitigated by using off-white (`#f0f0f0`) text on dark navy (`#0a0e1a`) — contrast ratio ~15:1, well above WCAG AAA requirements.
