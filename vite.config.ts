import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

/** Configures the React build, static output, and browser-like test environment. */
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    clearMocks: true,
    restoreMocks: true,
  },
});
