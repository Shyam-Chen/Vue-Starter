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
