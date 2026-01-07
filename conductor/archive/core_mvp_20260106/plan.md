# Plan: Core MVP

## Phase 1: Environment & Project Scaffolding [checkpoint: 4b8bfdd]
- [x] Task: Set up Docker configuration (Dockerfile, docker-compose.yml) with volume mounts for `./src`, `./content`, and `./db`. 5ff6b78
- [x] Task: Initialize Astro project with React and TypeScript inside the container.
- [x] Task: Configure basic Vanilla CSS reset and theme variables based on guidelines.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Environment & Project Scaffolding' (Protocol in workflow.md)

## Phase 2: Multilingual Content & Routing [checkpoint: f2e6e45]
- [x] Task: Set up Astro i18n routing for EN, HU, and RO.
- [x] Task: Create Markdown content structure in `./content` and implement content fetching logic.
- [x] Task: Implement common layout components (Nav with Language Switcher, Footer) using Vanilla CSS.
- [x] Task: Implement static pages (Home, About, Services, Contact) using Markdown data.
- [~] Task: Conductor - User Manual Verification 'Phase 2: Multilingual Content & Routing' (Protocol in workflow.md)

## Phase 3: Reservation System & Database [checkpoint: b830239]
- [x] Task: Initialize Prisma with SQLite and define the Reservation model.
- [x] Task: Create the React Reservation Form component with client-side validation.
- [x] Task: Implement Astro API Route for form submission and database insertion.
- [x] Task: Implement email confirmation service (stub or real).
- [x] Task: Conductor - User Manual Verification 'Phase 3: Reservation System & Database' (Protocol in workflow.md)

## Phase 4: Visuals & Polishing [checkpoint: f56df2d]
- [x] Task: Implement the Photo Gallery with a grid layout and lightbox functionality.
- [x] Task: Final styling pass for mobile responsiveness and accessibility (high contrast).
- [x] Task: Implement a basic admin route to view existing reservations.
- [x] Task: Conductor - User Manual Verification 'Phase 4: Visuals & Polishing' (Protocol in workflow.md)
