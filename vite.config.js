import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import components from 'vite-plugin-components';
import windicss from 'vite-plugin-windicss';
import icons, { ViteIconsResolver } from 'vite-plugin-icons';
import envify from 'process-envify';

import env from './env';

export default defineConfig({
  define: envify(env, { useImportMeta: true }),
  plugins: [
    vue(),
    components({
      dirs: [],
      customComponentResolvers: [ViteIconsResolver({ componentPrefix: 'icon' })],
    }),
    windicss(),
    icons(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
});
