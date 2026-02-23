## ADDED Requirements

### Requirement: Member document type in Sanity
The system SHALL define a Sanity document type `member` with the following fields: `characterName` (required string), `realm` (string, default "Ambershire"), `guildRank` (string, one of: gm, officer, raider, member), `role` (string, one of: tank, healer, dps), and `notes` (optional text).

#### Scenario: Creating a member document
- **WHEN** a guild officer creates a new member document in Sanity
- **THEN** they can set character name, realm, guild rank, role, and optional notes

#### Scenario: Guild rank options
- **WHEN** selecting a guild rank for a member
- **THEN** the available options are "gm", "officer", "raider", and "member"

#### Scenario: Role options
- **WHEN** selecting a role for a member
- **THEN** the available options are "tank", "healer", and "dps"

#### Scenario: Default realm
- **WHEN** creating a member without specifying a realm
- **THEN** the realm defaults to "Ambershire"

### Requirement: GROQ query for all members
The system SHALL provide a GROQ query that fetches all member documents ordered by guild rank (gm first, then officer, raider, member) and then by character name alphabetically.

#### Scenario: Members ordered by rank then name
- **WHEN** querying all members
- **THEN** results are ordered by rank priority (gm=0, officer=1, raider=2, member=3) then alphabetically by name

### Requirement: Member schema registered in Sanity config
The member schema SHALL be registered in the Sanity schema configuration so it appears in Sanity Studio.

#### Scenario: Schema appears in Studio
- **WHEN** Sanity Studio loads
- **THEN** the "Member" document type is available for creating and editing documents
