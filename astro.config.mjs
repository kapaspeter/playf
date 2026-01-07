// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  devToolbar: {
    enabled: process.env.NODE_ENV !== 'production'
  },
  redirects: {
    '/hu/about': '/hu/rolunk',
    '/hu/services': '/hu/szolgaltatasaink',
    '/hu/reservation': '/hu/foglalas',
    '/hu/gallery': '/hu/galeria',
    '/ro/about': '/ro/despre',
    '/ro/services': '/ro/servicii',
    '/ro/reservation': '/ro/rezervare',
    '/ro/gallery': '/ro/galerie',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hu', 'ro'],
    routing: {
      prefixDefaultLocale: true
    }
  }
});
