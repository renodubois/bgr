// import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(),
  //   VitePWA({
  //   registerType: 'prompt',
  //   injectRegister: false,
  //
  //   pwaAssets: {
  //     disabled: false,
  //     config: true,
  //   },
  //
  //   manifest: {
  //     name: 'BGR',
  //     short_name: 'BGR',
  //     description: 'Tracks board game results.',
  //     theme_color: '#ffffff',
  //   },
  //
  //   workbox: {
  //     globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
  //     cleanupOutdatedCaches: true,
  //     clientsClaim: true,
  //   },
  //
  //   devOptions: {
  //     enabled: true,
  //     navigateFallback: 'index.html',
  //     suppressWarnings: true,
  //     type: 'module',
  //   },
  // })
  ],
})
