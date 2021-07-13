import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path');
const { resolve } = path;
console.log(__dirname)
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: ['.vue', '.js', '.ts', '.tsx'],
    alias: [
      { find: '@', replacement: __dirname },
      { find: 'src', replacement: resolve(__dirname, './src') },
      { find: 'utils', replacement: resolve(__dirname, './utils') },
    ],
  },
  // build: {
  //   // build rollup的配置
  //   rollupOptions: {
  //     // https://rollupjs.org/guide/en/#big-list-of-options
  //     // 多页面的配置
  //     input: {
  //       main: resolve(__dirname, 'index.html'),
  //       // nested: resolve(__dirname, 'nested/index.html')
  //     }
  //   }
  // },
  plugins: [vue()]
})
