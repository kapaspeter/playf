# Track Specification: Localized URL Slugs & Enhanced Metadata

## Overview
This track implements localized URL slugs for all supported languages (English, Hungarian, Romanian) and enhances the page metadata system. We will use a `slug` field in the Markdown frontmatter to define the URL path and add support for SEO-specific tags (`MetaKeywords`, `MetaDescription`) and a `draft` status for pages.

## Functional Requirements

### 1. Content Schema Update
- Update the `pages` content collection schema in `src/content/config.ts` to include the following fields:
    - `slug`: `z.string().optional()` (for localized URLs)
    - `MetaKeywords`: `z.string().optional()`
    - `MetaDescription`: `z.string().optional()`
    - `draft`: `z.boolean().default(false)`

### 2. Markdown Metadata Update
- Add localized `slug` values to all Markdown files in the `content/` directory.
- Add `MetaKeywords`, `MetaDescription`, and `draft: false` to all existing Markdown files.

### 3. Routing & Page Generation
- **Slug Resolution:** Update `src/pages/[lang]/[slug].astro`'s `getStaticPaths` to use the `data.slug` from the frontmatter if provided, falling back to the filename if not.
- **Draft Filtering:** Update `getStaticPaths` to filter out any pages where `data.draft` is `true`.

### 4. Navigation & UI Updates
- **Meta Tags:** Update `Layout.astro` to accept optional `MetaKeywords` and `MetaDescription` props. If provided, these should override the default values in the `<head>`.
- **Dynamic Links:** Update `Layout.astro` and `LanguageSwitcher.astro` to dynamically resolve the localized URLs using the new slug system.

### 5. SEO & Redirects
- Implement 301 redirects for the old unlocalized URLs (e.g., `/hu/about` -> `/hu/rolunk`).

## Acceptance Criteria
- [ ] Visiting `http://localhost:4321/hu/szolgaltatasaink` displays the Hungarian Services page.
- [ ] Pages marked with `draft: true` are not accessible and do not appear in `getStaticPaths`.
- [ ] Custom `MetaKeywords` and `MetaDescription` from Markdown correctly populate the `<meta>` tags in the page source.
- [ ] Navigation links and language switcher correctly handle localized slugs.
