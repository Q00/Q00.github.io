import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import { rssPlugin } from './plugins/vite-rss-plugin.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    rssPlugin()
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@shared': '/packages/shared/src',
      '@ui': '/packages/ui/src'
    }
  },
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['@tanstack/react-router'],
          markdown: ['marked', 'dompurify', 'prismjs']
        }
      }
    }
  }
})