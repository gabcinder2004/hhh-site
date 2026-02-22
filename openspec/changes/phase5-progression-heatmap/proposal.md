## Why

A progression heatmap visualizes the guild's raiding journey as a calendar — similar to GitHub's contribution graph, but for raid nights. It shows at a glance how active the guild is, how many pulls each boss took, and the path from first attempt to kill. This is the most data-rich visualization on the site, turning raw raid data into a compelling visual story. ProgStats.io does this for retail WoW using Warcraft Logs data; we'll build our own version using manually curated data in Sanity.

## What Changes

- Add a progression heatmap component to the Raids page (or as a new `/progression` page)
- Calendar-style grid showing raid nights with color-coded intensity (more pulls = darker/brighter)
- Click a cell to see that night's details: bosses attempted, pull counts, kills, wipes
- Boss-by-boss progression view: timeline from first pull to kill with pull count per session
- Support multiple raid tiers
- Data managed via Sanity CMS (raid sessions with per-boss pull counts)

## Research Context

### ProgStats.io (the inspiration)
- Uses Warcraft Logs data to create detailed boss-by-boss progression charts
- Shows: pull counts per night, time spent, item level curves, night-by-night breakdowns
- Enables comparison against all other logged guilds
- The key visualization: **calendar heatmap + line graph of best % over time**

### GitHub contribution graph pattern
- Calendar grid: 52 columns (weeks) x 7 rows (days)
- Color intensity represents activity level (lighter = less, darker = more)
- Tooltips on hover showing exact data for that cell
- Simple, immediately readable, universally understood

### Warcraft Logs embeddable widgets
- Horizontal and vertical progress tiles showing guild name, boss fight, best %, pull count
- Customizable via URL query parameters
- Multiple graphs: pulls over time, percent curves, progression timeline
- We can't use these directly (TurtleWoW, not retail) but can replicate the visualization style

### Method's RWF dashboard visualizations
- Boss-by-boss tracking with percentage bars and pull count badges
- Live text commentary feed alongside the data
- Guild comparison graphs that update in real-time
- Red accent color (#e53552) for kills, orange (#ff9117) for in-progress

### Design considerations for Gilded Tavern theme

**Calendar heatmap colors**:
- Empty/no raid: transparent or very faint (`rgba(201,168,76,0.03)`)
- Light session (1-20 pulls): dim gold (`rgba(201,168,76,0.15)`)
- Medium session (21-50 pulls): moderate gold (`rgba(201,168,76,0.35)`)
- Heavy session (51-100 pulls): bright gold (`rgba(201,168,76,0.6)`)
- Intense session (100+ pulls): full gold (`#c9a84c`)
- Kill night: special green or bright gold-light (`#f5d978`) with a glow effect

**Boss progression timeline**:
- Horizontal bar chart showing pull count per night
- Color transitions from red (early wipes) to gold (getting close) to green (kill)
- Best percentage line overlaid on the bar chart
- Kill marker (skull or checkmark) on the night it died

**Tooltip design**:
- Glassmorphism tooltip matching site cards
- Show: date, bosses attempted, total pulls, kills that night

### Data model in Sanity

```
RaidSession document:
- date: date
- raid: reference to Raid document
- notes: optional string (officer commentary)
- encounters: array of objects:
  - boss: string (boss name)
  - pulls: number
  - bestPercent: number (0-100, best attempt that session)
  - killed: boolean
  - killPull: optional number (which pull was the kill)
```

This extends the existing Raid schema (which tracks bosses and kill status) with session-level granularity.

### Technical approach
- **SVG-based rendering**: Calendar grid and bar charts as SVG for crisp scaling
- **No charting library needed**: The visualizations are simple enough for hand-crafted SVG + Tailwind
- **Alternative**: If complexity grows, consider lightweight options like `uplot` or `chart.js`
- **Client-side interactivity**: Tooltips, click-to-expand, hover highlights — `'use client'` component
- **Responsive**: On mobile, calendar could switch to a vertical list of sessions; bar charts stack

### What makes this feature special
1. **Unique to guild sites**: Almost no guild websites have this. It's a "wow" factor for recruits.
2. **Tells the progression story**: "We spent 3 weeks on this boss" is more compelling as a visual than text.
3. **Guild pride**: Dense heatmaps show dedication. Sparse ones show the "chill" nature of the guild.
4. **Historical value**: Years later, members can revisit their progression journey.

### Comparison with existing raid progress page
The current raid progress page shows **current state** (which bosses are killed). The heatmap shows **the journey** (how we got there). They complement each other:
- Raid Progress = "We're 8/10 Mythic"
- Progression Heatmap = "It took us 347 pulls over 6 weeks to kill Boss #8"

## Capabilities

### New Capabilities

- `progression-heatmap`: Calendar-style heatmap grid showing raid sessions with color-coded intensity
- `boss-progression-chart`: Per-boss horizontal bar chart showing pull counts per session with kill markers
- `session-detail-tooltip`: Tooltip/popover showing session details on cell hover/click
- `sanity-raid-session-schema`: New Sanity document type for per-session raid data with boss encounters and pull counts

### Modified Capabilities

- `raid-progress`: Raids page updated to include or link to the progression heatmap view

## Impact

- **New files**: Heatmap component, boss chart component, tooltip component, Sanity session schema, session queries
- **Modified files**: Raids page (add heatmap section or link)
- **Client-side JavaScript**: Interactive SVG tooltips and click handlers
- **No new npm dependencies** (hand-crafted SVG)
- **Sanity schema addition**: New `raidSession` document type
- **Content creation**: Officers will need to log raid sessions (date, boss pulls, kills) — this is the most labor-intensive content requirement of any feature
- **Most complex feature**: This is the most technically ambitious feature in the roadmap
