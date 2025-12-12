import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

// Check if we're in dev mode
const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: 'static',
  // Only use adapter during build - Astro handles API routes natively in dev
  ...(isDev ? {} : { adapter: netlify() }),
  build: {
    assets: 'assets',
  },
});

