import path from 'path';
import { defineConfig } from 'vite';
import unocss from 'unocss/vite';
import { presetUno, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss';

export default defineConfig({
  plugins: [
    unocss({
      presets: [presetUno(), presetIcons()],
      transformers: [transformerDirectives({ enforce: 'pre' }), transformerVariantGroup()],
      theme: {
        colors: {
          primary: {
            // generated from https://little-color-hub.com/
            50: '#f4f3ff',
            100: '#ebe9fe',
            200: '#d9d5fe',
            300: '#beb5fd',
            400: '#a08bfa',
            500: '#845ef5',
            600: '#753dec',
            700: '#662cd6',
            800: '#5525b2',
            900: '#472191',
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../src'),
    },
  },
});
