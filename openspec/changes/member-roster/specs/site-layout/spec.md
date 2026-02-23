## MODIFIED Requirements

### Requirement: Navigation includes Roster link
The navbar and footer navigation SHALL include a "Roster" link pointing to `/roster`, positioned between "Raids" and "Gallery" in the navigation order.

#### Scenario: Roster link in navbar
- **WHEN** the navbar renders
- **THEN** it includes a "Roster" link at `/roster` between "Raids" and "Gallery"

#### Scenario: Roster link in footer
- **WHEN** the footer renders
- **THEN** it includes a "Roster" link at `/roster` in the navigation links
