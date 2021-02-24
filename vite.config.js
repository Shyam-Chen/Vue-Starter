import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import windicss from 'vite-plugin-windicss';
import envify from 'process-envify';

import env from './env';

export default defineConfig({
  define: envify(env, { useImportMeta: true }),
  plugins: [vue(), windicss()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
});
