import vue from '@vitejs/plugin-vue';
import envify from 'process-envify';
import tailwindColors from 'tailwindcss/colors';
import { presetIcons, presetWind3, transformerDirectives } from 'unocss';
import unocss from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  define: envify({}),
  plugins: [
    vue(),
    unocss({
      presets: [presetWind3(), presetIcons()],
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
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
