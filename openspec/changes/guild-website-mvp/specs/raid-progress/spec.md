## ADDED Requirements

### Requirement: Raid tier cards
The raid progress page SHALL display each raid tier as a distinct card/section.

#### Scenario: Raid tiers render with names
- **WHEN** the raid progress page is rendered
- **THEN** each raid tier is displayed as a card showing its name (e.g., "Molten Core", "Blackwing Lair")

#### Scenario: Raid tiers ordered by recency
- **WHEN** multiple raid tiers exist
- **THEN** they are displayed with the most current raid tier at the top

### Requirement: Progress bar per raid
Each raid tier card SHALL display a progress bar showing the fraction of bosses killed.

#### Scenario: Progress bar shows kill ratio
- **WHEN** a raid tier has 8 out of 10 bosses killed
- **THEN** the progress bar displays "8/10" and fills to 80% with the gold accent color

#### Scenario: Fully cleared raid
- **WHEN** all bosses in a raid tier are killed
- **THEN** the progress bar shows full (100%) and the count matches total bosses

#### Scenario: No kills yet
- **WHEN** no bosses in a raid tier are killed
- **THEN** the progress bar is empty (0%) and shows "0/N"

### Requirement: Boss kill list
Each raid tier card SHALL display a list of all bosses with their kill status.

#### Scenario: Killed boss display
- **WHEN** a boss has been killed
- **THEN** the boss row shows the boss name, a gold checkmark indicator, and the kill date

#### Scenario: Unkilled boss display
- **WHEN** a boss has not been killed
- **THEN** the boss row shows the boss name in a dimmed/grey style with no date

### Requirement: Collapsible older tiers
Older raid tiers SHALL be collapsible to keep the page manageable as progression history grows.

#### Scenario: Older tiers collapsed by default
- **WHEN** the raid progress page is rendered with more than one raid tier
- **THEN** only the most current raid tier is expanded; older tiers are collapsed

#### Scenario: Expanding a collapsed tier
- **WHEN** the user clicks on a collapsed raid tier header
- **THEN** the tier expands to show its boss list and progress bar

#### Scenario: Collapsing an expanded tier
- **WHEN** the user clicks on an expanded raid tier header
- **THEN** the tier collapses to show only its header

### Requirement: Empty raid progress state
The raid progress page SHALL handle the case where no raid data exists.

#### Scenario: No raids configured
- **WHEN** the raid progress page is rendered with no raid data
- **THEN** a message is displayed indicating no raid progress has been recorded yet
