# Implementation Plan: Content Path Refactor & UI Navigation Polish

This plan refactors the content storage structure, cleans up infrastructure configuration, and enhances the navigation UX.

## Phase 1: Infrastructure & Content Relocation [checkpoint: 6f858a6]
- [x] Task: Relocate Markdown content to project root
    - [x] Create `./content` directory if it doesn't exist
    - [x] Move files from `src/content/pages/` to `./content/`
- [x] Task: Update Docker configuration
    - [x] Remove `./conductor` volume mount from `docker-compose.yml`
    - [x] Update `docker-compose.yml` to mount `./content` to `/app/src/content/pages` (to maintain Astro compatibility while keeping files at root)
- [x] Task: Verify content rendering after relocation
    - [x] Restart Docker containers
    - [x] Verify that all pages still load correctly from the new source path
- [x] Task: Conductor - User Manual Verification 'Phase 1: Infrastructure & Content Relocation' (Protocol in workflow.md)

## Phase 2: Enhanced Language Switching [checkpoint: 3a8a4e7]
- [x] Task: Implement Slug-Preserving Language Switcher
    - [x] Update `LanguageSwitcher.astro` to extract the current slug from the URL
    - [x] Modify the locale links to include the current slug (e.g., `/[new-lang]/[current-slug]`)
- [x] Task: Add translation fallback logic
    - [x] Implement a check (or use Astro's `getEntry`) to verify if the slug exists in the target language
    - [x] Fallback to the target language's homepage if the slug is missing
- [x] Task: Write tests for language switching logic
- [x] Task: Conductor - User Manual Verification 'Phase 2: Enhanced Language Switching' (Protocol in workflow.md)

## Phase 3: Navigation UI Polish [checkpoint: dbbda4d]
- [x] Task: Implement Active Menu Detection
    - [x] In `Layout.astro`, determine the current active path using `Astro.url.pathname`
- [x] Task: Apply Active Styling to Navigation
    - [x] Add conditional `.active` class to navigation links in `Layout.astro`
    - [x] Add Vanilla CSS styles for the `.active` state (color, font-weight, or indicator)
- [x] Task: Conductor - User Manual Verification 'Phase 3: Navigation UI Polish' (Protocol in workflow.md)
