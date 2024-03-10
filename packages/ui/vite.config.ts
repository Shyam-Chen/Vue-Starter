/** @type {import('vite').UserConfig} */
import Vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import envify from 'process-envify';
import unocss from 'unocss/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssCodeSplit: true,
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      fileName: 'lyra-vue-ui',
      // formats: ['es'],
      name: 'lyra-vue-ui',
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
  define: envify({}),
  plugins: [Vue(), dts(), unocss({})],
  resolve: {
    mainFields: ['module'],
  },
  // @ts-ignore
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
