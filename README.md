# Happy Hour Heroes

Guild website for **Happy Hour Heroes**, a semi-casual raiding guild on TurtleWoW.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4**
- **Sanity CMS** for content (posts, raids, gallery, guild info)
- **Vitest** + React Testing Library (108 tests)

## Setup

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm test          # run all tests
```

### Environment Variables

Set these to connect Sanity CMS (optional — site works without them):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

## Pages

- `/` — Hero + news feed (asymmetric layout)
- `/raids` — Raid progress with expandable tiers and animated progress bars
- `/gallery` — Masonry grid with lightbox and tag filtering
- `/about` — Guild info and officer list
- `/news/[slug]` — Individual post detail

## Design

"Gilded Tavern" theme — warm dark backgrounds, gold accents, glassmorphism cards, MedievalSharp + Cinzel typography, noise grain overlay, and vignette effects.
