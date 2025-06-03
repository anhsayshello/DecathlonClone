import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer()] as any,
  test: {
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, './tests/vitest.setup.js'),
    testTimeout: 20000
  },
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src/')
    }
  }
})
