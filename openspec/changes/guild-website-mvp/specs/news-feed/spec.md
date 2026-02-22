## ADDED Requirements

### Requirement: Hero section on home page
The home page SHALL display a hero section with the guild name, tagline, and a call-to-action button.

#### Scenario: Hero displays guild identity
- **WHEN** the home page is rendered
- **THEN** the hero section shows "Happy Hour Heroes" as a heading, "Alliance & Horde · TurtleWoW" as a tagline, and a CTA button

#### Scenario: Hero CTA links to join
- **WHEN** the user clicks the CTA button in the hero section
- **THEN** they are navigated to the About/Join page

### Requirement: News feed displays posts
The home page SHALL display a vertical list of blog-style post cards below the hero section, ordered by date descending (newest first).

#### Scenario: Posts render as cards
- **WHEN** the home page is rendered with posts available
- **THEN** each post appears as a card showing title, date, author, category tag, and preview text

#### Scenario: Posts with thumbnails show images
- **WHEN** a post has a thumbnail image
- **THEN** the post card displays the thumbnail

#### Scenario: Posts without thumbnails render without image
- **WHEN** a post does not have a thumbnail image
- **THEN** the post card renders without an image placeholder

#### Scenario: Empty state
- **WHEN** the home page is rendered with no posts
- **THEN** a message is displayed indicating no posts are available yet

### Requirement: Post category tags
Each post card SHALL display a category tag indicating the type of content (e.g., Raid Kill, Event, Announcement, Competition).

#### Scenario: Category tag is visible
- **WHEN** a post card is rendered
- **THEN** the category tag is displayed with distinct styling

### Requirement: Full post page
Each post SHALL have a dedicated page at `/news/[slug]` displaying the full content.

#### Scenario: Full post renders rich content
- **WHEN** a user navigates to `/news/[slug]`
- **THEN** the page displays the post title, date, author, category, and full body content with embedded images

#### Scenario: Invalid slug shows 404
- **WHEN** a user navigates to `/news/[nonexistent-slug]`
- **THEN** a 404 page is displayed

### Requirement: Post click-through navigation
Post cards on the home page SHALL link to their full post page.

#### Scenario: Clicking a post card navigates to full post
- **WHEN** the user clicks on a post card
- **THEN** they are navigated to `/news/[slug]` for that post
