# Track Specification: Enhanced Reservation System & UI Polish

## Overview
This track focuses on upgrading the reservation system with strict scheduling rules, implementing a modern UI with Dark/Light mode support, and adding administrative controls for calendar availability. It also includes infrastructure improvements for environment-specific configurations.

## Functional Requirements

### 1. Navigation & UI
- **Language Switcher:** Implement as a custom Vanilla CSS dropdown menu using SVG icons for flags.
- **Mobile Navigation:** Implement a custom "Hamburger" menu for mobile viewports.
- **Theme Support:** Implement Dark and Light modes using CSS Custom Properties (`:root`) and a `data-theme` attribute on the `<html>` tag.
- **Menu Renaming:** Rename the "Contact" menu item and corresponding references to "Reservation".

### 2. Reservation Logic
- **Capacity:** Enforce a maximum of 10 participants per reservation event.
- **Scheduling:** 
    - Fixed time slots: `10:00`, `12:00`, `14:00`, `16:00`, `18:00`, `20:00`.
    - Maximum of 6 reservations per day (one per slot).
    - Hours already reserved for a specific date must be hidden from the dropdown menu.
    - Reservations must be saved in the database with the actual hour.
- **Date Selection:**
    - Users must not be able to manually type a date; selection is restricted to the calendar picker.
    - Only "Working Dates" are selectable.
    - **Default Non-Working Days:** Weekends and Public Holidays (Romania/Hungary).

### 3. Calendar Visualization
- Availability under each day in the date picker must be indicated by dots:
    - 6 dots: 0 reservations (Full availability)
    - 5 dots: 1 reservation
    - ...
    - 1 dot: 5 reservations
    - 0 dots/Disabled: 6 reservations (Full)

### 4. Admin Functionality
- **Admin Panel (`/admin/reservations`):** Allow administrators to block entire days (Binary Blocking), making them unavailable for any reservations.

### 5. Infrastructure
- **Environment Management:** Use a `.env` file to toggle between `development` and `production` modes for Docker.
- **Production Optimization:** In `production` mode, the Astro Dev Toolbar/Control Panel must be disabled/hidden from the footer.

## Non-Functional Requirements
- **Styling:** Adhere to the "Pure Vanilla CSS" principle.
- **Performance:** Ensure dot visualization and slot filtering logic are optimized for client-side performance.

## Acceptance Criteria
- [ ] Language switcher displays flags and toggles languages correctly.
- [ ] Hamburger menu functions on mobile devices.
- [ ] Dark/Light mode toggle correctly updates the `data-theme` and UI colors.
- [ ] Reservation form enforces 10-participant limit and restricted time slots.
- [ ] Already booked time slots are absent from the time dropdown.
- [ ] Calendar correctly displays dots based on remaining availability.
- [ ] Admin can block a day, rendering it unselectable for users.
- [ ] Astro toolbar is hidden when the environment is set to `production`.

## Out of Scope
- Integration with third-party calendar services (Google/Outlook).
- Payment gateway integration for reservations.