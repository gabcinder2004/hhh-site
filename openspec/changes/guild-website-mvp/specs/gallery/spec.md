## ADDED Requirements

### Requirement: Masonry grid layout
The gallery page SHALL display images in a masonry (staggered) grid layout that accommodates mixed aspect ratios.

#### Scenario: Desktop layout
- **WHEN** the viewport width is desktop (1024px+)
- **THEN** images are displayed in a 3-column masonry grid

#### Scenario: Tablet layout
- **WHEN** the viewport width is tablet (768px-1023px)
- **THEN** images are displayed in a 2-column masonry grid

#### Scenario: Mobile layout
- **WHEN** the viewport width is mobile (below 768px)
- **THEN** images are displayed in a single column

### Requirement: Image metadata display
Each image in the gallery grid SHALL display its caption and metadata on hover or below the image.

#### Scenario: Image with caption
- **WHEN** an image has a caption
- **THEN** the caption is displayed with the image

#### Scenario: Image with uploadedBy
- **WHEN** an image has an uploadedBy field
- **THEN** the character name is displayed with the image

### Requirement: Lightbox viewer
Clicking a gallery image SHALL open a full-size lightbox overlay.

#### Scenario: Opening lightbox
- **WHEN** the user clicks on a gallery image
- **THEN** a full-size overlay opens showing the image

#### Scenario: Lightbox navigation
- **WHEN** the lightbox is open
- **THEN** previous and next buttons allow navigating between images

#### Scenario: Closing lightbox
- **WHEN** the user clicks the close button or presses Escape
- **THEN** the lightbox overlay closes

### Requirement: Tag-based filtering
The gallery page SHALL allow filtering images by tags.

#### Scenario: Tag filter buttons displayed
- **WHEN** the gallery page is rendered
- **THEN** filter buttons are displayed for all available tags (e.g., "Raid Kills", "Events", "PvP", "Memes") plus an "All" option

#### Scenario: Filtering by tag
- **WHEN** the user clicks a tag filter button
- **THEN** only images with that tag are displayed in the grid

#### Scenario: Showing all images
- **WHEN** the user clicks the "All" filter button
- **THEN** all images are displayed regardless of tags

### Requirement: Empty gallery state
The gallery page SHALL handle the case where no images exist.

#### Scenario: No images available
- **WHEN** the gallery page is rendered with no images
- **THEN** a message is displayed indicating no screenshots have been uploaded yet
