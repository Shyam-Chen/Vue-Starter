export default {
  title: 'Vue Starter',
  description: 'A boilerplate for HTML5, Vue, TypeScript, Vite, Playwright, and Render.',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'Configs', link: '/configs' },
      { text: 'Changelog', link: 'https://github.com/...' },
    ],
    sidebar: [
      {
        text: 'Introduction',
        collapsible: true,
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Getting Started', link: '/guide/getting-started' },
        ],
      },
      {
        text: 'Authentication',
        collapsible: true,
        items: [
          { text: 'Item C', link: '/item-c' },
          { text: 'Item D', link: '/item-d' },
        ],
      },
      {
        text: 'Modules',
        collapsible: true,
        items: [
          { text: 'Todos', link: '/modules/todos' },
          { text: 'Item D', link: '/item-d' },
        ],
      },
      {
        text: 'Components',
        collapsible: true,
        items: [
          { text: 'Buttons', link: '/components/buttons' },
          { text: 'Item D', link: '/item-d' },
        ],
      },
      {
        text: 'Section Title B',
        collapsible: true,
        items: [
          { text: 'Item C', link: '/item-c' },
          { text: 'Item D', link: '/item-d' },
        ],
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    }
  },
};
