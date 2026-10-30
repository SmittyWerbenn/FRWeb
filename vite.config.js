import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * GitHub Pages tidak punya SPA rewrite. Trik standar: `404.html` adalah salinan
 * `index.html`, sehingga URL dalam seperti `/preview/padel-futsal-master`
 * tetap memuat aplikasi lalu router membaca path-nya.
 */
function spaFallback() {
  let outDir = 'dist'
  return {
    name: 'frweb-spa-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    async writeBundle() {
      const dir = resolve(process.cwd(), outDir)
      await copyFile(resolve(dir, 'index.html'), resolve(dir, '404.html'))
    },
  }
}

// Asset base is configurable so the same build works in two places:
// - GitHub Pages project site: VITE_BASE=/FRWeb/  (set in the deploy workflow)
// - Custom domain (frcloud.cloud) or local dev: VITE_BASE=/ (default)
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss(), spaFallback()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
