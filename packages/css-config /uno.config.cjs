import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
} from 'unocss';
import tailwindColors from 'tailwindcss/colors';
import { presetFlowbite } from '@julr/unocss-preset-flowbite';

export default defineConfig({
  presets: [
    presetUno(),
    presetFlowbite(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'none',
      fonts: {
        script: 'Homemade Apple',
      },
    }),
  ],
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
});
