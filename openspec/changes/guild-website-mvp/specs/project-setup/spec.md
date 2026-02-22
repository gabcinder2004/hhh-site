## ADDED Requirements

### Requirement: Next.js project with TypeScript
The project SHALL be a Next.js application using the App Router with TypeScript enabled and strict mode configured.

#### Scenario: Project initializes successfully
- **WHEN** the developer runs the dev server
- **THEN** the application starts without errors and serves pages at localhost

#### Scenario: TypeScript strict mode
- **WHEN** TypeScript compiles the project
- **THEN** strict mode is enforced with no type errors

### Requirement: Tailwind CSS integration
The project SHALL use Tailwind CSS v4 for styling with a custom theme configured for the guild's color palette.

#### Scenario: Custom theme colors available
- **WHEN** a component uses the class `text-gold` or `bg-navy`
- **THEN** the corresponding guild palette colors are applied (`#d4a843` for gold, `#0a0e1a` for navy)

#### Scenario: Tailwind processes all component files
- **WHEN** components use Tailwind utility classes
- **THEN** the corresponding CSS is generated in the build output

### Requirement: Sanity client configuration
The project SHALL include a configured Sanity client library that connects to the Sanity project for content fetching.

#### Scenario: Sanity client reads environment variables
- **WHEN** the application initializes the Sanity client
- **THEN** it reads `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` from environment variables

#### Scenario: Sanity client fetches content
- **WHEN** a page requests content via the Sanity client
- **THEN** the client returns data from the configured Sanity dataset

### Requirement: Testing framework
The project SHALL use Vitest and React Testing Library for unit and component testing.

#### Scenario: Tests run successfully
- **WHEN** the developer runs the test command
- **THEN** Vitest discovers and executes all test files matching `**/*.test.{ts,tsx}`

#### Scenario: React components can be tested
- **WHEN** a test renders a React component using React Testing Library
- **THEN** the component renders in a jsdom environment and can be queried
