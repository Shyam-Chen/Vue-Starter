import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { presetUno } from 'unocss';
import unocss from 'unocss/vite';
import presetIcons from '@unocss/preset-icons';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  plugins: [
    vue(),
    unocss({
      presets: [presetUno(), presetIcons()],
    }),
  ],
});
