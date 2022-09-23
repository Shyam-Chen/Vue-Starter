import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { presetUno } from 'unocss';
import unocss from 'unocss/vite';
import presetIcons from '@unocss/preset-icons';
import envify from 'process-envify';

import env from './env';

export default defineConfig({
  define: envify(env),
  plugins: [
    vue(),
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
