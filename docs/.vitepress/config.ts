import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Vue Starter',
  description: 'A boilerplate for HTML5, Vue, TypeScript, Vite, Playwright, and Render.',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Modules', link: '/modules/todos' },
    ],
    sidebar: {
      '/guide': [
        {
          text: 'Project Setup',
          collapsible: true,
          items: [{ text: 'Introduction', link: '/guide/getting-started' }],
        },
        {
          text: 'Directory Structure',
          collapsible: true,
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
          collapsible: true,
          items: [{ text: 'Button', link: '/guide/components/buttons' }],
        },
      ],
      '/modules': [
        {
          text: 'Dashboard',
          collapsible: true,
          items: [{ text: 'Dashboard', link: '/modules/todos' }],
        },
        {
          text: 'My List',
          collapsible: true,
          items: [{ text: 'Todos', link: '/modules/todos' }],
        },
      ],
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You',
    },
  },
});
