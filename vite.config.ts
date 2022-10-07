import path from 'path';
import { defineConfig } from 'vite';
import envify from 'process-envify';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/unplugin-vue-i18n/vite';
import unocss from 'unocss/vite';
import { presetUno } from 'unocss';
import presetIcons from '@unocss/preset-icons';

import env from './env';

export default defineConfig({
  define: envify(env),
  plugins: [
    vue(),
    vueI18n({ include: path.resolve(__dirname, 'src/locales/**') }),
    unocss({ presets: [presetUno(), presetIcons()] }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': env.MOCK_API,
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
