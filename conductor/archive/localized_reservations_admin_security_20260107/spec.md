# Track Specification: Localized Reservations & Admin Security

## Overview
This track addresses two primary goals: fixing the rendering of localized reservation pages (HU/RO) and securing the administrative interface with a non-prefixed route and password protection.

## Functional Requirements

### 1. Localized Reservation Pages
- **Conditional Rendering Update:** Update `src/pages/[lang]/[slug].astro` to ensure the `ReservationForm` component renders for all localized reservation slugs (`reservation`, `foglalas`, `rezervare`).
- **Dynamic Language Support:** Ensure the `lang` prop passed to `ReservationForm` remains correct for each localized route.

### 2. Admin Refactoring & Security
- **Path Migration:** Move the admin reservations interface from `/en/admin/reservations` (and other localized versions) to a single, non-prefixed root route: `/admin/reservations`.
- **Authentication:**
    - Show a minimalist login overlay/form if the user is not authenticated.
    - Validate the password against an `ADMIN_PASSWORD` defined in the `.env` file.
    - Use a temporary session cookie to maintain the authenticated state.
- **Admin Interface:** Maintain the current "Blocked Days" management and reservation list within the new secure route.

### 3. Navigation Updates
- **Admin Link:** Update the link in `Layout.astro` (footer) to point to the new `/admin/reservations` path.

## Non-Functional Requirements
- **Security:** Ensure the admin password is never exposed to the client-side code. Authentication checks for data fetching (API routes) must also be considered.
- **Performance:** Minimal overhead for the authentication check.

## Acceptance Criteria
- [ ] Visiting `/hu/foglalas` displays the Hungarian reservation page with the form.
- [ ] Visiting `/ro/rezervare` displays the Romanian reservation page with the form.
- [ ] Visiting `/admin/reservations` prompts for a password if not logged in.
- [ ] Providing the correct `ADMIN_PASSWORD` (from `.env`) grants access to the admin dashboard.
- [ ] The admin session persists across page refreshes during the session.
- [ ] The localized admin routes (e.g., `/en/admin/reservations`) are no longer functional or redirect to the root admin route.

## Out of Scope
- Multi-user authentication (single password only).
- Password hashing or complex identity management.
