import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  base:'/TinyFlowers/',
  build:{
    outDir:'docs'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }, css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/css/constant.scss";'
      }
    }
  } 
})
