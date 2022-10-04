import path from 'path';
import url from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import i18n from '@intlify/unplugin-vue-i18n/vite';
import { presetUno } from 'unocss';
import unocss from 'unocss/vite';
import presetIcons from '@unocss/preset-icons';
import envify from 'process-envify';

import env from './env';

export default defineConfig({
  define: envify(env),
  plugins: [
    vue(),
    i18n({
      include: path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), './src/locales/**'),
    }),
    unocss({
      presets: [presetUno(), presetIcons()],
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
