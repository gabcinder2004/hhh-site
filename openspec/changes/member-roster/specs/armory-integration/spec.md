## ADDED Requirements

### Requirement: Fetch character data from turtlecraft.gg armory
The system SHALL fetch character data from `https://turtlecraft.gg/armory/{realm}/{characterName}` by extracting the Laravel Livewire `wire:snapshot` attribute from the HTML response, decoding HTML entities, and parsing the JSON to return the character object.

#### Scenario: Successful character data extraction
- **WHEN** fetching armory data for character "Ox" on realm "Ambershire"
- **THEN** the system returns an object containing name, race, class, level, gender, guild_name, rank, online status, and avatar fields

#### Scenario: Character not found
- **WHEN** fetching armory data for a non-existent character
- **THEN** the system returns null

#### Scenario: Cloudflare or network error
- **WHEN** the HTTP request to turtlecraft.gg fails or times out
- **THEN** the system returns null without throwing an error

#### Scenario: Missing wire:snapshot in HTML
- **WHEN** the HTML response does not contain a `wire:snapshot` attribute
- **THEN** the system returns null

### Requirement: Extract equipment data from snapshot
The system SHALL extract the equipment array from the Livewire snapshot, where each item contains slot, itemEntry, name, icon URL, quality, item_level, and qualityColor.

#### Scenario: Character has equipment
- **WHEN** armory data is fetched for a character with equipped items
- **THEN** the equipment array is available with slot, name, icon, and quality for each item

### Requirement: Extract profession data from snapshot
The system SHALL extract the skills/professions array from the Livewire snapshot, returning skill ID, value, and image name for each profession.

#### Scenario: Character has professions
- **WHEN** armory data is fetched for a character with professions
- **THEN** the professions array includes skill name and skill level

### Requirement: Build-time batch fetching with delay
The system SHALL fetch armory data for all members sequentially at build time with a configurable delay between requests (default 500ms) to avoid triggering rate limits.

#### Scenario: Multiple members fetched with delay
- **WHEN** fetching armory data for 10 members at build time
- **THEN** requests are made sequentially with at least 500ms between each request

### Requirement: Map numeric race and class IDs to names
The system SHALL map numeric race IDs (e.g., 6 = Tauren) and class IDs (e.g., 11 = Druid) from the armory snapshot to human-readable names.

#### Scenario: Race and class ID mapping
- **WHEN** a character has race ID 6 and class ID 11
- **THEN** the system maps these to "Tauren" and "Druid"
