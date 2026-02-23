## ADDED Requirements

### Requirement: Roster page displays members grouped by guild rank
The system SHALL render a `/roster` page that displays all guild members organized into rank sections in the order: Guild Master, Officers, Raiders, Members. Each section SHALL have an ornamental divider with the rank name in Cinzel Decorative font, flanked by gold horizontal rules and diamond ornaments.

#### Scenario: Page renders with members in correct rank groups
- **WHEN** the roster page loads with members of various ranks in Sanity
- **THEN** members appear under their corresponding rank section headers in the order GM → Officers → Raiders → Members

#### Scenario: Empty rank group is hidden
- **WHEN** no members exist for a particular rank
- **THEN** that rank section and its divider SHALL NOT render

### Requirement: Member cards display compact character info
Each member card SHALL display: online indicator (green dot if online), class icon with class color, character name (linked to turtlecraft.gg armory), level (right-aligned), race and class name with role on a second line, and PvP rank title on a third line if present. Cards SHALL use the `glass-card` style with a 3px left border in the character's WoW class color.

#### Scenario: Fully enriched member card
- **WHEN** armory data is available for a member
- **THEN** the card displays name, class icon, level, race, class, role, PvP rank, and online status with class-colored left border

#### Scenario: Fallback card without armory data
- **WHEN** armory data is unavailable for a member
- **THEN** the card displays name, realm, and guild rank from Sanity with a "View on Armory" link and no class-colored accent

#### Scenario: PvP rank omitted when absent
- **WHEN** a member has no PvP rank
- **THEN** the third line of the card is not rendered

### Requirement: Guild Master card has featured styling
The Guild Master card SHALL span 2 grid columns on tablet and desktop breakpoints and SHALL have a subtle gold `glowPulse` border animation. On mobile (single column) it SHALL be full width.

#### Scenario: GM card spans 2 columns on desktop
- **WHEN** the roster renders on a viewport >= 768px
- **THEN** the GM card spans 2 grid columns

#### Scenario: GM card is full width on mobile
- **WHEN** the roster renders on a viewport < 768px
- **THEN** the GM card occupies the full single column

### Requirement: Class filter bar filters members by class
The roster page SHALL display a horizontal row of class filter buttons: an "All" text pill followed by 9 circular buttons (one per WoW class), each filled with the class color and containing a class icon. Clicking a class button SHALL fade non-matching member cards to 15% opacity. Clicking the active filter again SHALL return to showing all members.

#### Scenario: Clicking a class filter fades non-matching members
- **WHEN** user clicks the Druid filter button
- **THEN** all non-Druid member cards transition to 15% opacity and Druid cards remain at full opacity

#### Scenario: Clicking active filter resets to all
- **WHEN** user clicks the currently active class filter
- **THEN** all member cards return to full opacity

#### Scenario: Rank sections fade when all members filtered
- **WHEN** a class filter is active and a rank section has zero matching members
- **THEN** the entire rank section (divider + cards) fades to 15% opacity

### Requirement: Card hover uses class-colored glow
Member cards SHALL display a box-shadow glow in their class color on hover, replacing the default gold `glass-card` hover glow.

#### Scenario: Hover glow matches class color
- **WHEN** user hovers over a Druid member card
- **THEN** the card displays an orange (`#FF7C0A`) box-shadow glow instead of the default gold glow

### Requirement: Staggered entrance animation
Member cards SHALL animate in with the existing `fadeInUp` animation on page load, with increasing `animation-delay` per card to create a cascading reveal effect.

#### Scenario: Cards animate in sequence
- **WHEN** the roster page loads
- **THEN** each card animates in with `fadeInUp` and each subsequent card has a slightly longer delay

### Requirement: Responsive grid layout
The member card grid SHALL be responsive: 4 columns on desktop (1024px+), 3 columns on tablet (768–1023px), 1 column on mobile (<768px).

#### Scenario: Desktop shows 4 columns
- **WHEN** viewport is >= 1024px
- **THEN** member cards display in a 4-column grid

#### Scenario: Mobile shows 1 column
- **WHEN** viewport is < 768px
- **THEN** member cards stack in a single column

### Requirement: Empty state when no members configured
When no members exist in Sanity, the roster page SHALL display the message "The guild hall awaits its heroes..." with a fallback prompt.

#### Scenario: No members in Sanity
- **WHEN** the Sanity member query returns an empty array
- **THEN** the page displays "The guild hall awaits its heroes..."

### Requirement: Placeholder roster when Sanity is not configured
When Sanity is not configured (development/preview), the roster page SHALL display a static placeholder roster with 3 fake members so the page is visually testable.

#### Scenario: Sanity not configured
- **WHEN** `isSanityConfigured` is false
- **THEN** the page renders 3 placeholder member cards with sample data

### Requirement: Page heading with member count
The roster page SHALL display a shimmer-animated heading "Guild Roster" followed by a subtitle showing the total member count (e.g., "24 members strong").

#### Scenario: Heading shows member count
- **WHEN** the roster has 24 members
- **THEN** the subtitle reads "24 members strong"
