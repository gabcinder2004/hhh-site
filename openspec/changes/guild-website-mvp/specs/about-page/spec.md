## ADDED Requirements

### Requirement: Guild description
The about page SHALL display a rich text description of the guild.

#### Scenario: Description renders
- **WHEN** the about page is rendered
- **THEN** the guild description is displayed as formatted rich text

### Requirement: Discord join button
The about page SHALL display a prominent button linking to the guild's Discord server.

#### Scenario: Discord button links correctly
- **WHEN** the about page is rendered with a Discord link configured
- **THEN** a prominent button is displayed that opens the Discord invite URL in a new tab

#### Scenario: Discord link not configured
- **WHEN** the about page is rendered without a Discord link
- **THEN** the Discord button is not displayed

### Requirement: Officer list
The about page SHALL optionally display a list of guild officers with their names and roles.

#### Scenario: Officers displayed
- **WHEN** the about page is rendered with officers configured
- **THEN** each officer is displayed with their character name and role

#### Scenario: No officers configured
- **WHEN** the about page is rendered with no officers
- **THEN** the officer section is not displayed
