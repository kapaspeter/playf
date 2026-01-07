# Tech Stack: Plyfull

## Frontend Framework
- **Astro:** Core framework for fast, content-driven static pages.
- **React.js:** Used for interactive components, specifically the reservation form.
- **Theme Toggle:** Custom Vanilla CSS/JS implementation for Dark/Light mode.
- **Multilingual Support:** Implemented via Astro's `src/pages/[lang]/` structure (English, Hungarian, Romanian) with localized slug resolution.

## Styling
- **Vanilla CSS:** Pure CSS without preprocessors, ensuring maximum performance and adherence to standard web technologies.
- **CSS Variables:** Semantic tokens for theming (Light/Dark).
- **SEO:** Dynamic MetaKeywords and MetaDescription tags via Layout props.
- **Authentication:** Simple password-based session management using cookies for the admin dashboard.

## Backend & Database
- **Prisma:** ORM for robust and type-safe interaction with the database.
- **SQLite:** Lightweight, file-based database for reservation data storage.
- **Astro API Routes:** Server-side logic for form submissions and Prisma queries.

## Infrastructure & DevOps (Docker)
- **Base Image:** `node:22-alpine` (Small, modern, and secure).
- **Adapter:** `@astrojs/node` for SSR and production preview.
- **Environment:** Fully containerized; all JS libraries are installed inside the container to keep the base system clean.
- **Volume Mounts (`docker-compose.yml`):**
    - **Source Code:** `./src` is mounted to the container to enable hot reloading and ensure compiled JS updates in real-time.
    - **Markdown Content:** Root `./content` is mounted to `/app/src/content/pages` in the container; modifications trigger static page regeneration.
    - **Database:** The `./db` directory is mounted to the container to ensure the SQLite database persists across container lifecycles.
- **Workflow:** The containerized environment is the primary runner for development, compilation, and content generation.
