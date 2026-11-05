import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://adasharchitects.com',
  output: 'static',
  // Start loading a page as soon as its link is hovered or tapped.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  redirects: {
    '/projects.html': '/projects/',
    '/aboutus.html': '/about/',
    '/contact.html': '/contact/',
  },
  integrations: [
    sitemap({ filter: (page) => !page.includes('.html') }),
  ],
  vite: { plugins: [tailwindcss()] },
});
