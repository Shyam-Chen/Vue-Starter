import { resolve } from 'path';
import { defineConfig } from 'vite';
import envify from 'process-envify';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import unocss from '@unocss/postcss';
import { presetUno, presetIcons, transformerDirectives } from 'unocss';

import pkg from './package.json';

export default defineConfig({
  define: envify({}),
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: Object.keys(pkg.dependencies),
    },
  },
  plugins: [vue(), dts()],
  css: {
    postcss: {
      plugins: [
        unocss({
          configOrPath: {
            content: {
              filesystem: ['**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}'],
            },
            presets: [presetUno(), presetIcons()],
            transformers: [transformerDirectives({ enforce: 'pre' })],
            theme: {
              colors: {
                primary: {
                  '50': '#f3f2ff',
                  '100': '#e9e8ff',
                  '200': '#d6d4ff',
                  '300': '#b8b1ff',
                  '400': '#9585ff',
                  '500': '#6644ff',
                  '600': '#6030f7',
                  '700': '#531ee3',
                  '800': '#4418bf',
                  '900': '#39169c',
                  '950': '#210b6a',
                },
                secondary: {
                  '50': '#fef1fa',
                  '100': '#fee5f6',
                  '200': '#feccee',
                  '300': '#ff99dd',
                  '400': '#fe68c9',
                  '500': '#f83cb0',
                  '600': '#e81a8f',
                  '700': '#ca0c72',
                  '800': '#a70d5e',
                  '900': '#8b1050',
                  '950': '#55022d',
                },
              },
            },
          },
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
