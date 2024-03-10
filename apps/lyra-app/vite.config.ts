import path from 'path';
import Vue from '@vitejs/plugin-vue';
import envify from 'process-envify';
// import tailwindColors from 'tailwindcss/colors';
// import { presetIcons, presetUno, transformerDirectives } from 'unocss';
import unocss from 'unocss/vite';
// import config from '@lyra/css-config/uno.config.mjs'
import { defineConfig } from 'vite';
import vueRoutes from 'vite-plugin-vue-routes';

export default defineConfig({
  define: envify({
    API_URL: process.env.API_URL || '',
  }),
  plugins: [Vue(), vueRoutes(), unocss({})],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
      mock: path.resolve(__dirname, '../mock/src/routes'),
    },
    mainFields: ['module'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        ws: true,
      },
    },
  },
  // @ts-ignore
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
