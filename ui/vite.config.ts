import vue from '@vitejs/plugin-vue';
import envify from 'process-envify';
import tailwindColors from 'tailwindcss/colors';
import { presetIcons, presetUno, transformerDirectives } from 'unocss';
import unocss from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  define: envify({}),
  plugins: [
    vue(),
    unocss({
      presets: [presetUno(), presetIcons()],
      transformers: [transformerDirectives({ enforce: 'pre' })],
      theme: {
        colors: {
          primary: tailwindColors.indigo,
          secondary: tailwindColors.neutral,
          success: tailwindColors.emerald,
          danger: tailwindColors.rose,
          warning: tailwindColors.amber,
          info: tailwindColors.sky,
        },
      },
    }),
  ],
  resolve: {
    mainFields: ['module'],
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
