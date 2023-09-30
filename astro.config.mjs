import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';
import dotenv from 'dotenv';

console.log(process.env.NODE_ENV);
dotenv.config({ path: 'env/.env'});

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  site: "http://localhost:3001/",
  compressHTML: true
});
