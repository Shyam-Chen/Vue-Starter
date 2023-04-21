import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Lorem Ipsum',
  description: 'Sed accumsan egestas nunc non',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: 'https://vitejs.dev/logo.svg' }]],
  themeConfig: {
    logo: 'https://vitejs.dev/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Modules', link: '/modules/todos' },
    ],
    sidebar: {
      '/guide': [
        {
          text: 'Project Setup',
          collapsed: false,
          items: [{ text: 'Introduction', link: '/guide/getting-started' }],
        },
        {
          text: 'Directory Structure',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/guide/directory-structure/introduction' },
            { text: 'public', link: '/guide/directory-structure/public' },
            {
              text: 'src',
              items: [
                { text: 'modules', link: '/guide/directory-structure/modules' },
                // { text: 'plugins', link: '/directory-structure/plugins' },
              ],
            },
            { text: 'gitignore', link: '/guide/directory-structure/gitignore' },
          ],
        },
        {
          text: 'Prebuilt Components',
          collapsed: false,
          items: [{ text: 'Button', link: '/guide/components/buttons' }],
        },
      ],
      '/modules': [
        { text: 'Dashboard', link: '/modules/dashboard' },
        {
          text: 'Playground',
          collapsed: false,
          items: [{ text: 'CRUD Operations', link: '/modules/todos' }],
        },
      ],
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Lorem Ipsum',
    },
  },
});
