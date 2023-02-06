import path from 'path';
import { defineConfig } from 'vite';
import envify from 'process-envify';
import vue from '@vitejs/plugin-vue';
import unocss from 'unocss/vite';
import { presetUno, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss';

import env from './env';

export default defineConfig({
  define: envify(env),
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-'),
        },
      },
      reactivityTransform: true,
    }),
    unocss({
      presets: [presetUno(), presetIcons()],
      transformers: [transformerDirectives(), transformerVariantGroup()],
      theme: {
        // generated from https://little-color-hub.com/
        colors: {
          primary: {
            // tailwindcss
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',

            // vue
            // 50: '#edfdf5',
            // 100: '#d2fae5',
            // 200: '#aaf4d0',
            // 300: '#71e8b6',
            // 400: '#38d496',
            // 500: '#15bb7d',
            // 600: '#0a9865',
            // 700: '#087954',
            // 800: '#096044',
            // 900: '#094f39',

            // svelte
            // 50: '#fff5ef',
            // 100: '#ffe9da',
            // 200: '#fed2b6',
            // 300: '#fdb386',
            // 400: '#fa8751',
            // 500: '#f6642c',
            // 600: '#e54919',
            // 700: '#bf3613',
            // 800: '#9a2c16',
            // 900: '#7d2816',

            // preact
            // 50: '#f4f3ff',
            // 100: '#ebe9fe',
            // 200: '#d9d5fe',
            // 300: '#beb5fd',
            // 400: '#a08bfa',
            // 500: '#845ef5',
            // 600: '#753dec',
            // 700: '#662cd6',
            // 800: '#5525b2',
            // 900: '#472191',
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
      },
    },
  },
  test: {
    environment: 'happy-dom',
  },
});
