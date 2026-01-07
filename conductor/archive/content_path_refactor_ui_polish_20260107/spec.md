# Track Specification: Content Path Refactor & UI Navigation Polish

## Overview
This track focuses on moving the source of truth for Markdown content to the project root, cleaning up the Docker configuration, and improving the navigation experience by ensuring the language switcher preserves state and the active menu is highlighted.

## Functional Requirements

### 1. Content Path Refactor
- **Source Relocation:** Move Markdown files from `src/content/pages` to `./content` in the project root.
- **Astro Integration:** Configure Astro to use `./content` as the source for the content collections (via `astro.config.mjs` or symlinks/configuration adjustments).
- **Structure:** Maintain the `<lang>/<slug>.md` directory structure.

### 2. Infrastructure (Docker)
- **Mount Update:** Update `docker-compose.yml` to mount the new project-level `./content` directory into the container.
- **Mount Removal:** Remove the `./conductor:/app/conductor` volume mount from `docker-compose.yml` as it's not needed for the running application.

### 3. Navigation & Language Switching
- **Slug Preservation:** Modify the `LanguageSwitcher.astro` component (or relevant logic) to redirect to the *current* page's slug in the new language instead of defaulting to the home page.
- **Fallback:** If the current page does not exist in the target language, redirect to the home page of that language.
- **Active Menu State:** Implement logic in `Layout.astro` to detect the current route and apply an `.active` class to the corresponding navigation link.
- **Styling:** Add Vanilla CSS styles for the `.active` class to provide visual feedback to the user.

## Non-Functional Requirements
- **Consistency:** Ensure the theme support (Dark/Light mode) implemented in previous tracks remains functional.
- **Performance:** Ensure route detection logic for the active menu is efficient.

## Acceptance Criteria
- [ ] Markdown files are successfully moved to `./content` and the site renders them correctly.
- [ ] `docker-compose.yml` no longer mounts the `conductor` directory.
- [ ] Switching languages on `/en/about` redirects the user to `/ro/about` (or `/hu/about`).
- [ ] If a translation is missing, the user is redirected to the home page of the target language.
- [ ] The current navigation link in the header is visually highlighted using an `.active` CSS class.

## Out of Scope
- Localized (translated) slugs for different languages (slugs remain identical).
- Complex redirect logic for renamed pages.
