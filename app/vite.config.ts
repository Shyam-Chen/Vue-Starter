import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import envify from 'process-envify';
import tailwindColors from 'tailwindcss/colors';
import {
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
} from 'unocss';
import unocss from 'unocss/vite';
import { defineConfig } from 'vite';
import vueRoutes from 'vite-plugin-vue-routes';

export default defineConfig({
  define: envify({
    API_URL: process.env.API_URL || '',
  }),
  plugins: [
    vue(),
    vueRoutes(),
    unocss({
      presets: [
        presetUno(),
        presetTypography(),
        presetIcons(),
        presetWebFonts({
          fonts: {
            sans: ['Roboto:400,500,600,700,800'],
            mono: ['Roboto Mono:400,500,600,700,800'],
          },
        }),
      ],
      transformers: [transformerDirectives({ enforce: 'pre' })],
      theme: {
        colors: {
          primary: tailwindColors.indigo,
          secondary: tailwindColors.neutral,
          success: tailwindColors.emerald,
          danger: tailwindColors.rose,
          warning: tailwindColors.amber,
          info: tailwindColors.sky,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
      mock: path.resolve(__dirname, '../mock/src/routes'),
    },
    mainFields: ['module'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        ws: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
