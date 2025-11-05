import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    // Enable PWA support. This plugin will generate a service worker and precache assets.
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'HOTMESS London',
        short_name: 'HOTMESS',
        description: 'Brutalist luxury editorial platform for men – shop, radio, care, affiliate and community.',
        theme_color: '#2c0000',
        background_color: '#0d0d0d',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
      }
    })
  ]
})
