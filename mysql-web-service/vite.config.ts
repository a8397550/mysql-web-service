import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path');
const {resolve} = path;

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // build rollup的配置
    rollupOptions: {
      // https://rollupjs.org/guide/en/#big-list-of-options
      // 多页面的配置
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/index.html')
      }
    }
  },
  plugins: [vue()]
})
