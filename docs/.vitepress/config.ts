import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'PROJECT_TITLE',
  description: 'PROJECT_DESCRIPTION',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'https://vitejs.dev/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
  ],
  themeConfig: {
    logo: 'https://vitejs.dev/logo.svg',
    search: {
      provider: 'local',
    },
  },
});
