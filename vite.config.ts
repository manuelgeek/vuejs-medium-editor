/* eslint-disablyarn add e no-undef */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: 'window',
  },
  publicDir: 'src/assets',
  build: {
    lib: {
      entry: resolve(__dirname, 'src/Editor.vue'),
      name: 'VuejsMediumEditor',
      fileName: 'vuejs-medium-editor',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
