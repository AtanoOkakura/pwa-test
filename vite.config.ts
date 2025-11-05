import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: 'https://atanookakura.github.io/pwa-test/',
  build: {
    outDir: 'docs',
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ogg}']
      },
      manifest: {
        name: 'test-pwa',
        short_name: 'test-pwa',
        description: 'A simple PWA test application',
        theme_color: '#333333',
        display: 'standalone',
        start_url: 'https://atanookakura.github.io/pwa-test/',
        icons: [{
          src: 'src/assets/vue.svg',
          sizes: '192x192',
          type: 'image/svg+xml',
        }, {
          src: 'src/assets/vue.svg',
          sizes: '512x512',
          type: 'image/svg+xml',
        },
        {
          src: 'logo192.png',
          sizes: '192x192',
          type: 'image/png',
        }, {
          src: 'logo512.png',
          sizes: '512x512',
          type: 'image/png',
        }
        ],
      },
    })
  ],
  // ★ ここを追加するよ！
  server: {
    host: '0.0.0.0', // 外部からの接続を許可！
    port: 5173,      // ポート番号（デフォルトと同じでOK）
  }
})

