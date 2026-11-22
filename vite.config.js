import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const root = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        en: resolve(root, 'en/index.html'),
      },
    },
  },
})
