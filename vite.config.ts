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
    }),
    unocss({
      presets: [presetUno(), presetIcons()],
      transformers: [transformerDirectives(), transformerVariantGroup()],
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
