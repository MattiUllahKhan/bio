import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Change '/' to '/your-repo-name/' if using a subpath on GitHub Pages
  build: {
    outDir: 'dist',
  },
  server: {
    host: true,
  }
});
