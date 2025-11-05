import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
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
        icons: [{
          src: 'src/assets/vue.svg',
          sizes: '192x192',
          type: 'image/svg+xml',
        }, {
          src: 'src/assets/vue.svg',
          sizes: '512x512',
          type: 'image/svg+xml',
        },
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

