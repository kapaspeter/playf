# Initial Concept

Clone the website https://www.playfull.ro using Astro with React.js.
- **Static Content:** Must come from Markdown files.
- **Reservation Form:** Connect to a React service.
- **Database:** SQLite for reservation data.
- **ORM:** React Prisma for SQL interaction.
- **Localization:** Multilanguage support (English, Hungarian, Romanian).
- **Styling:** Pure Vanilla CSS.
- **Infrastructure:**
    - Fully Dockerized.
    - All JS libraries installed in Docker container.
    - Source code mounted via `docker-compose.yml` (hot reloading/updates).
    - Markdown files located at root `./content` and mounted via `docker-compose.yml`.
    - SQLite database mounted via `docker-compose.yml`.

## Product Vision
Plyfull is a high-performance, SEO-friendly, and multilingual web application designed to clone and enhance the user experience of playfull.ro. It serves as a digital gateway for schools, kindergartens, and companies to discover, explore, and book a premium playground and event venue.

## Target Users
- **Educational Institutions:** Schools and kindergartens organizing group trips and outings.
- **Corporate Clients:** Companies looking for team-building venues or family-oriented corporate events.

## Core Features
- **Multilingual Content:** Full support for English, Hungarian, and Romanian with localized URL slugs, served via Markdown for easy maintenance.
- **Advanced Reservation System:** A robust reservation form capturing contact info, event dates, participant counts (max 10), and package selections, with real-time availability visualization (dots).
- **Visual Showcase:** A high-quality photo gallery and detailed service pages (Pricing/Packages) to drive engagement.
- **Information Hub:** Comprehensive Home, About Us, and Reservation pages to establish trust and provide essential location data.
- **Secure Administration:** A dedicated, password-protected administrative interface for managing reservations and calendar availability.
- **SEO Optimization:** Support for custom MetaKeywords and MetaDescription on a per-page basis.

## User Goals
- **Booking & Availability:** Quickly check open slots and book events.
- **Transparency:** Easy access to detailed pricing and package information.
- **Exploration:** Visual confirmation of the venue's quality through photos.
- **Accessibility:** Finding contact details and the physical location effortlessly.

## Visual Identity
- **Vibe:** A harmonious blend of "Playful & Colorful" (to reflect the playground environment) and "Modern & Minimalist" with Dark and Light mode support.
- **Styling:** Pure Vanilla CSS, emphasizing fast load times and maintainable code without heavy frameworks.