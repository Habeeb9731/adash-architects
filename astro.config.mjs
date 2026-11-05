import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://adasharchitects.com',
  output: 'static',
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
