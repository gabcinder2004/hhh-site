## ADDED Requirements

### Requirement: Root layout with dark theme
The application SHALL wrap all pages in a root layout that applies the dark navy background (`#0a0e1a`) and off-white text (`#f0f0f0`) globally.

#### Scenario: Dark theme applied to all pages
- **WHEN** any page is rendered
- **THEN** the page has a dark navy background and off-white text color

### Requirement: Fixed navigation bar
The application SHALL display a fixed navigation bar at the top of every page with the guild name on the left and page links on the right.

#### Scenario: Navbar displays guild name
- **WHEN** any page is rendered
- **THEN** the navbar shows "Happy Hour Heroes" on the left side

#### Scenario: Navbar contains page links
- **WHEN** any page is rendered
- **THEN** the navbar contains links to Home, Raids, Gallery, and About

#### Scenario: Active page link is highlighted
- **WHEN** the user is on a specific page
- **THEN** the corresponding navbar link is visually distinguished with the gold accent color

### Requirement: Mobile responsive navigation
The navigation SHALL collapse into a hamburger menu on screens narrower than the tablet breakpoint.

#### Scenario: Hamburger menu on mobile
- **WHEN** the viewport width is below the tablet breakpoint (768px)
- **THEN** the page links are hidden and a hamburger menu icon is displayed

#### Scenario: Mobile menu opens and closes
- **WHEN** the user taps the hamburger icon
- **THEN** a menu panel opens showing all navigation links
- **WHEN** the user taps a link or the close button
- **THEN** the menu panel closes

### Requirement: Footer
The application SHALL display a footer at the bottom of every page with the guild name and a copyright line.

#### Scenario: Footer renders on all pages
- **WHEN** any page is rendered
- **THEN** a footer is visible at the bottom with "Happy Hour Heroes" and the current year
