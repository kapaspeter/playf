# Specification: Core MVP

## Overview
This track focuses on delivering the foundational version of the Plyfull website. It includes a multilingual static site (English, Hungarian, Romanian) powered by Astro and Markdown, a React-based reservation form with validation, and a backend using Prisma with SQLite. The entire environment will be containerized.

## Functional Requirements
- **Multilingual Routing:** `/en/`, `/hu/`, `/ro/` subdirectories.
- **Content Management:** Static pages (Home, About, Services, Gallery, Contact) managed via localized Markdown files.
- **Reservation System:**
    - Form fields: Name, Email, Phone, Date, Time, Participants, Package.
    - Validation (Required fields, valid email).
    - Data persistence in SQLite via Prisma.
    - User email confirmation.
    - Basic admin view for reservations.
- **Visuals:** Responsive grid gallery with lightboxes.

## Technical Requirements
- **Frontend:** Astro 4+, React 18+.
- **Backend:** Astro API Routes + Prisma Client.
- **Database:** SQLite (mounted volume).
- **Styling:** Vanilla CSS.
- **Infrastructure:** Docker Compose with hot-reloading for code and content.

## Acceptance Criteria
- Site is navigable in all three languages.
- Markdown content updates reflect in the browser.
- Reservation form submits and saves to database.
- Mobile responsive layout.
