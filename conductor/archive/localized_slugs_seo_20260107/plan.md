# Implementation Plan: Localized URL Slugs & Enhanced Metadata

This plan implements localized slugs and additional SEO/status metadata for content pages.

## Phase 1: Content Schema & Metadata Update
- [x] Task: Update Content Collection Schema
    - [x] Modify `src/content/config.ts` to include `slug`, `MetaKeywords`, `MetaDescription`, and `draft`.
- [x] Task: Update Markdown Files with Localized Slugs and Metadata
    - [x] Update all English files in `content/en/`.
    - [x] Update all Hungarian files in `content/hu/` (e.g., `rolunk`, `szolgaltatasaink`).
    - [x] Update all Romanian files in `content/ro/` (e.g., `despre`, `servicii`).
- [x] Task: Conductor - User Manual Verification 'Phase 1: Content Schema & Metadata Update' (Protocol in workflow.md)

## Phase 2: Enhanced Layout & Routing
- [x] Task: Update Layout for SEO Meta Tags
    - [x] Modify `src/layouts/Layout.astro` to accept and render `MetaKeywords` and `MetaDescription`.
- [x] Task: Update Dynamic Routing with Slug Override and Draft Filter
    - [x] Modify `src/pages/[lang]/[slug].astro`'s `getStaticPaths` to prioritize `data.slug`.
    - [x] Implement `draft: true` filtering in `getStaticPaths`.
- [x] Task: Implement URL Redirects
    - [x] Add logic (or middleware) to handle redirects from legacy paths to localized paths.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Enhanced Layout & Routing' (Protocol in workflow.md)

## Phase 3: Navigation & Switcher Update [checkpoint: f98c6bf]
- [x] Task: Update Header Navigation Links
    - [x] Update `Layout.astro` to resolve localized links dynamically based on the current locale and slug mapping.
- [x] Task: Update Language Switcher for Localized Slugs
    - [x] Modify `LanguageSwitcher.astro` to map the current page to the correct localized slug in other languages.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Navigation & Switcher Update' (Protocol in workflow.md)
