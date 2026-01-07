# Implementation Plan: Localized Reservations & Admin Security

This plan focuses on fixing the localized reservation forms and securing the administrative interface with a root route and password protection.

## Phase 1: Localized Reservation Fixes [checkpoint: 6ca2896]
- [x] Task: Update `[slug].astro` for Localized Form Rendering
    - [x] Update the conditional rendering check to include `foglalas` and `rezervare`.
    - [x] Ensure the correct `lang` is passed to the `ReservationForm`.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Localized Reservation Fixes' (Protocol in workflow.md)

## Phase 2: Admin Route Migration & Protection
- [x] Task: Create Root Admin Route
    - [x] Create `src/pages/admin/reservations.astro`.
    - [x] Migrate the logic and UI from `src/pages/[lang]/admin/reservations.astro`.
    - [x] Delete the old localized admin routes.
- [x] Task: Implement Admin Authentication
    - [x] Add `ADMIN_PASSWORD` to `.env.example` and `.env`.
    - [x] Create an API route `/api/admin/login` to validate the password and set a session cookie.
    - [x] Implement a minimalist login form component or inline overlay in the admin page.
    - [x] Add session validation logic to the admin page and protected API routes (blocked-days).
- [x] Task: Update Layout Footer Link
    - [x] Update the "Admin" link in `src/layouts/Layout.astro` to point to `/admin/reservations`.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Admin Route Migration & Protection' (Protocol in workflow.md)
