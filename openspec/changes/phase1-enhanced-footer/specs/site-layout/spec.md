## MODIFIED Requirements

### Requirement: Footer
The application SHALL display a multi-section centered footer at the bottom of every page with an ornamental divider, Discord invite button, navigation links, guild tagline, and copyright.

#### Scenario: Footer renders ornamental divider
- **WHEN** any page is rendered
- **THEN** the footer displays an ornamental divider at the top, consisting of two gold gradient lines extending outward from a central diamond character, matching the Hero component's divider pattern

#### Scenario: Footer renders Discord invite button
- **WHEN** any page is rendered
- **THEN** the footer displays a prominent button with a Discord logo icon and the text "Join Our Discord"
- **THEN** the button links to the guild's Discord invite URL
- **THEN** the link opens in a new tab (`target="_blank"`) with `rel="noopener noreferrer"`
- **THEN** the link has `aria-label="Join our Discord server"` for accessibility

#### Scenario: Discord button visual treatment
- **WHEN** the Discord button is rendered
- **THEN** it uses the gold gradient background (`from-gold to-gold-light`) with dark text
- **THEN** it has a subtle gold glow box-shadow
- **WHEN** the user hovers over the Discord button
- **THEN** the button scales up slightly and the glow intensifies

#### Scenario: Footer renders navigation links
- **WHEN** any page is rendered
- **THEN** the footer displays navigation links for Home, Raids, Gallery, and About
- **THEN** the links are separated by gold middot characters
- **THEN** the links are wrapped in a `<nav>` element with `aria-label="Footer navigation"`

#### Scenario: Footer navigation link hover
- **WHEN** the user hovers over a footer navigation link
- **THEN** the link text transitions to gold-light color

#### Scenario: Footer renders guild tagline
- **WHEN** any page is rendered
- **THEN** the footer displays the text "Chill Raids · Good People · Classic Vibes" in muted, italic, uppercase styling

#### Scenario: Footer renders copyright
- **WHEN** any page is rendered
- **THEN** the footer displays "Happy Hour Heroes © {current year}" at the bottom in minimal, muted styling

#### Scenario: Footer vertical spacing
- **WHEN** the footer is rendered
- **THEN** the vertical spacing between sections decreases progressively from top to bottom (tapered cadence)

#### Scenario: Footer responsive layout
- **WHEN** the footer is viewed on any screen size
- **THEN** all content remains centered and vertically stacked with no column rearrangement
