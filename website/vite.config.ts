import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Two pages, one build:
//   /            -> public site   (index.html)
//   /admin/      -> back-office   (admin/index.html)
// BASE_PATH is set by GitHub Actions to "/ticho/" (the GitHub Pages sub-path).
// If you later move to a custom domain, set it to "/".
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // firebase SDK is big; fine for this site
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
      },
    },
  },
});
