/// <reference types="vitest" />
/// <reference types="vite/client" />

import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
    environment: 'jsdom',
    exclude: [
      '__tests__/e2e/**/*.[jt]s?(x)',
      '**/node_modules/**',
      '**/.git/**',
    ],
    setupFiles: ['./__tests__/setup.ts'],
  },
});
