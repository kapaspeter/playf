# Implementation Plan: Enhanced Reservation System & UI Polish

This plan follows the TDD-based workflow and includes infrastructure, UI, and backend enhancements.

## Phase 1: Environment & Project Setup [checkpoint: 7e9c1d9]
- [x] Task: Configure environment-based Docker setup and .env handling
    - [x] Create/Update `.env.example` and `.env` for `NODE_ENV` management
    - [x] Update `docker-compose.yml` to pass environment variables
- [x] Task: Implement Astro Dev Toolbar suppression in production
    - [ ] Update `astro.config.mjs` to toggle `devToolbar` based on environment
- [x] Task: Rename "Contact" to "Reservation" across the codebase
    - [x] Update navigation labels in `Layout.astro` or relevant components
    - [x] Rename content files and routes if necessary (e.g., `contact.md` to `reservation.md`)
- [x] Task: Conductor - User Manual Verification 'Phase 1: Environment & Project Setup' (Protocol in workflow.md)

## Phase 2: Theme Support & Global Styling [checkpoint: 86b8c78]
- [x] Task: Implement Dark/Light Mode Foundation
    - [x] Define CSS Custom Properties for both themes in `variables.css`
    - [x] Add logic to `Layout.astro` to initialize theme from `localStorage` or system preference
- [x] Task: Create Theme Toggle Component
    - [x] Implement `ThemeToggle` component
- [x] Task: Conductor - User Manual Verification 'Phase 2: Theme Support & Global Styling' (Protocol in workflow.md)

## Phase 3: Advanced Navigation Components [checkpoint: d212b29]
- [x] Task: Implementation of Language Switcher with SVG Flags
    - [x] Source or create SVG icons for English, Hungarian, and Romanian flags
    - [x] Implement custom Vanilla CSS dropdown for language selection
- [x] Task: Implementation of Mobile Hamburger Menu
    - [x] Create mobile-specific navigation overlay
    - [x] Implement Vanilla CSS/JS for menu toggle behavior
- [x] Task: Conductor - User Manual Verification 'Phase 3: Advanced Navigation Components' (Protocol in workflow.md)

## Phase 4: Core Reservation Logic & Validation
- [x] Task: Enforce Participant and Time Slot Constraints
    - [x] Update `ReservationForm` validation to cap participants at 10
    - [x] Update API route to validate the 10-participant limit server-side
- [x] Task: Implement Time Slot Filtering
    - [x] Write failing tests for slot availability logic
    - [x] Implement API logic to fetch existing bookings for a date
    - [x] Filter out-of-stock hours (`10:00`, `12:00`, `14:00`, `16:00`, `18:00`, `20:00`) in the frontend dropdown
- [x] Task: Ensure Real Hour Persistence
    - [x] Verify Prisma schema and API save the full timestamp/hour correctly
- [x] Task: Conductor - User Manual Verification 'Phase 4: Core Reservation Logic & Validation' (Protocol in workflow.md)

## Phase 5: Dynamic Calendar & Availability Visualization [checkpoint: d31f142]
- [x] Task: Restrict Date Selection in Picker
    - [x] Disable manual text entry in the date field
    - [x] Implement logic to disable weekends and public holidays in the calendar
- [x] Task: Implement "Dot" Availability Visualization
- [x] Task: Conductor - User Manual Verification 'Phase 5: Dynamic Calendar & Availability Visualization' (Protocol in workflow.md)

## Phase 6: Admin Controls [checkpoint: c833f88]
- [x] Task: Build Day Blocking Interface for Admin
    - [x] Create `/admin/reservations` route (or update existing)
    - [x] Implement "Block Day" functionality (saves a special entry in DB to mark day as full/unavailable)
    - [x] Update user-facing calendar to respect admin-blocked days
- [x] Task: Conductor - User Manual Verification 'Phase 6: Admin Controls' (Protocol in workflow.md)
