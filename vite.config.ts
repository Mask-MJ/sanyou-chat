import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({ dts: './types/typed-router.d.ts' }),
    vue(),
    vueJsx(),
    Unocss(),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        { 'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'] }
      ],
      vueTemplate: true,
      dirs: ['src/stores', 'src/components'],
      dts: 'types/auto-imports.d.ts'
    }),
    Components({ dts: 'types/components.d.ts', resolvers: [NaiveUiResolver()] })
  ],
  server: {
    port: 3100,
    host: true,
    proxy: {
      '/api': {
        target: 'http://69d5beda.r22.cpolar.top',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  esbuild: { pure: ['console.log', 'console.info', 'console.error'] },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
