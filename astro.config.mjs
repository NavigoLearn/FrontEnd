import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config

import dotenv from 'dotenv';
dotenv.config({ path: 'segment-env/.env' });

export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  site: "http://localhost:3001/",
  compressHTML: true
});
