## ADDED Requirements

### Requirement: Post document schema
Sanity SHALL have a Post document type with fields for title, slug, author, date, category, thumbnail, body, and published flag.

#### Scenario: Post schema fields
- **WHEN** a Post document is created in Sanity Studio
- **THEN** the editor presents fields for title (string), slug (slug), author (string), date (datetime), category (string enum: Raid Kill, Event, Announcement, Competition), thumbnail (image), body (portable text), and published (boolean)

#### Scenario: Slug auto-generates from title
- **WHEN** the author enters a title for a new post
- **THEN** the slug field auto-generates a URL-safe slug from the title

### Requirement: Raid document schema
Sanity SHALL have a Raid document type with fields for name, sort order, and an inline array of boss objects.

#### Scenario: Raid schema fields
- **WHEN** a Raid document is created in Sanity Studio
- **THEN** the editor presents fields for name (string), order (number), and bosses (array of objects)

#### Scenario: Boss object fields
- **WHEN** a boss object is added to a Raid's bosses array
- **THEN** the editor presents fields for name (string), killed (boolean), killDate (date), and killScreenshot (image)

### Requirement: GalleryImage document schema
Sanity SHALL have a GalleryImage document type with fields for image, caption, date, tags, and uploadedBy.

#### Scenario: GalleryImage schema fields
- **WHEN** a GalleryImage document is created in Sanity Studio
- **THEN** the editor presents fields for image (image, required), caption (string), date (datetime), tags (array of strings), and uploadedBy (string)

### Requirement: GuildInfo singleton schema
Sanity SHALL have a GuildInfo singleton document type with fields for description, Discord link, and officers.

#### Scenario: GuildInfo schema fields
- **WHEN** the GuildInfo document is edited in Sanity Studio
- **THEN** the editor presents fields for description (portable text), discordLink (url), and officers (array of objects with name and role strings)

#### Scenario: GuildInfo is a singleton
- **WHEN** the Sanity Studio loads
- **THEN** only one GuildInfo document can exist

### Requirement: GROQ queries for content fetching
The application SHALL define GROQ queries for fetching all content types from Sanity.

#### Scenario: Fetch published posts ordered by date
- **WHEN** the home page requests posts
- **THEN** the query returns all posts where published is true, ordered by date descending

#### Scenario: Fetch single post by slug
- **WHEN** a post page requests a specific post
- **THEN** the query returns the post matching the given slug

#### Scenario: Fetch all raids ordered by sort order
- **WHEN** the raid progress page requests raids
- **THEN** the query returns all raids ordered by the order field ascending (most current first)

#### Scenario: Fetch gallery images with optional tag filter
- **WHEN** the gallery page requests images
- **THEN** the query returns all gallery images ordered by date descending, optionally filtered by tag

#### Scenario: Fetch guild info
- **WHEN** the about page requests guild info
- **THEN** the query returns the GuildInfo singleton document
