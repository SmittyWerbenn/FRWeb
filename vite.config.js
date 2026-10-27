import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Asset base is configurable so the same build works in two places:
// - GitHub Pages project site: VITE_BASE=/FRWeb/  (set in the deploy workflow)
// - Custom domain (frcloud.cloud) or local dev: VITE_BASE=/ (default)
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
