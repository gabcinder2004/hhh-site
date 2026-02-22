## Why

A member roster is the core identity feature of any guild website. It answers "who are these people?" for recruits and gives members a sense of belonging. Currently the site only shows officers on the About page. A dedicated roster page with live character data from turtlecraft.gg armory transforms the site from a content-only portal into a living representation of the guild.

## What Changes

- Add a new `/roster` page displaying all guild members
- Create a Sanity schema for guild members (manually curated list of character names + realm)
- Build a data pipeline to fetch character details from turtlecraft.gg armory pages
- Display members with class icons, level, race, PvP rank, professions, and guild rank
- Add the Roster link to navbar and footer navigation
- Support filtering/grouping by class, role, or rank

## Research Context

### Turtlecraft.gg Armory Integration (from API investigation)

**No official API exists**, but complete character data is embedded in every armory page via Laravel Livewire's `wire:snapshot` attribute.

**URL Pattern**: `GET https://turtlecraft.gg/armory/{realm}/{characterName}`

**Extraction method**:
```javascript
async function getCharacterData(realm, name) {
  const res = await fetch(`https://turtlecraft.gg/armory/${realm}/${name}`);
  const html = await res.text();
  const match = html.match(/wire:snapshot="([^"]+)"/);
  if (!match) throw new Error('No snapshot found');
  const decoded = match[1]
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#039;/g, "'");
  const snapshot = JSON.parse(decoded);
  return snapshot.data.character[0];
}
```

**Available character fields**:
| Field | Type | Example |
|-------|------|---------|
| `name` | string | "Ox" |
| `race` | number | 6 (Tauren) |
| `class` | number | 11 (Druid) |
| `gender` | number | 0 (Male) |
| `level` | number | 60 |
| `guild_name` | string/null | "Happy Hour Heroes" |
| `rank` | string | "Blood Guard" |
| `rank_number` | string | "07" |
| `online` | number | 0/1 |
| `honorRankPoints` | number | 25000 |
| `honorHighestRank` | number | 11 |
| `avatar` | string | "Druid-tauren-m-60" |

**Equipment** (19 slots per character): `itemEntry`, `slot`, `enchantments`, `name`, `icon` (full URL), `quality`, `item_level`, `qualityColor`

**Skills/Professions**: `{ "skill": 165, "value": 300, "image": "Leatherworking" }`

**Talents**: Full talent tree data with spec names and point allocations

**Reputation**: Array of `{ "faction": 21, "standing": 5703 }` pairs

### Guild roster is manual-only

There is no guild roster API on turtlecraft.gg — no guild pages, no guild search, no way to list members programmatically. The only option is:
1. Manually add character names in Sanity CMS
2. Fetch individual character profiles to enrich with live data
3. Optionally, an in-game addon could export the roster via `GetGuildRosterInfo()` SavedVariables

### How top guilds display rosters
- **Guilds of WoW**: Automated roster with class distribution charts, gear audits, sortable columns, character detail views
- **WoWAudit**: Spreadsheet-style with specs, item levels, gem/enchant audits, links to Raider.IO and Warcraft Logs
- **Method/Liquid/Echo**: Minimal public rosters — focus on team bios for their competitive roster only

### Design considerations for our semi-casual guild
- **Class-colored borders or icons** for visual identity (Warrior = brown, Druid = orange, etc.)
- **Grouping by role** (Tanks, Healers, DPS) or **by rank** (Officers, Raiders, Members)
- **Card layout** rather than spreadsheet — fits the Gilded Tavern aesthetic better
- **Online status indicator** (green dot) if character is currently online
- **Link to turtlecraft.gg armory** for full character details

### Caveats
- **Cloudflare protection**: turtlecraft.gg blocks AI crawlers. Be respectful with request volume.
- **No rate limit headers visible**, but Cloudflare may enforce limits
- **Data freshness**: Character data should be fetched at build time (SSG) or cached, not on every page load
- **Realms**: Primarily Ambershire for this guild, but schema should support multiple realms

## Capabilities

### New Capabilities

- `member-roster`: New `/roster` page with guild member cards showing class, level, race, PvP rank, professions, and equipment summary
- `roster-data-pipeline`: Server-side data fetching from turtlecraft.gg armory to enrich Sanity member entries with live character data
- `sanity-member-schema`: New Sanity document type for guild members (name, realm, role/rank, notes)

### Modified Capabilities

- `site-layout`: Add "Roster" link to navbar and footer navigation

## Impact

- **New files**: Roster page, roster components, armory fetch utility, Sanity member schema
- **Modified files**: Navbar, Footer (new nav link)
- **External dependency**: HTTP requests to turtlecraft.gg at build time
- **Sanity schema addition**: New `member` document type
- **No new npm dependencies** (uses native `fetch`)
