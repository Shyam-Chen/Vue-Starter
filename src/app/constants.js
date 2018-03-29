export const INITIAL = {
  drawer: null,
  navigation: [
    // Basic
    { icon: 'face', text: 'Hello World', route: '/hello-world', subheader: 'Basic' },
    {
      icon: 'loyalty',
      text: '101 Guide',
      group: '101-guide',
      model: false,
      children: [
        { text: 'Foo', route: '/foo' },
        {
          text: 'Bar',
          group: 'bar',
          children: [
            { text: 'Bar - 1', route: '/bar-1' },
            { text: 'Bar - 2', route: '/bar-2' },
          ],
        },
      ],
    },
    {
      icon: 'business',
      text: 'CRUD Operations',
      model: false,
      children: [
        { text: 'Basic', route: '/crud-operations/basic' },
        { text: 'REST', route: '/crud-operations/rest' },
        { text: 'GraphQL', disabled: true },
      ],
    },
    {
      icon: 'contacts',
      text: 'Form Controls',
      model: false,
      children: [
        { text: 'Template-driven', route: '/form-controls/template-driven' },
      ],
    },

    // Advanced
    {
      icon: 'loyalty',
      text: '201 Guide',
      disabled: true,
      subheader: 'Advanced',
      model: false,
      children: [],
    },
    {
      icon: 'fa fa-table',
      text: 'Data Table',
      disabled: true,
      model: false,
      children: [
        { text: 'Basic', disabled: true },
        { text: 'REST', disabled: true },
        { text: 'GraphQL', disabled: true },
      ],
    },
    { icon: 'language', text: 'Internationalization', route: '/i18n' },
    { icon: 'fa fa-id-card', text: 'Reactive Forms ', route: '/reactive-forms', disabled: true },
    {
      icon: 'verified_user',
      text: 'Authorization',
      disabled: true,
      model: false,
      children: [
        { text: 'REST', disabled: true },
        { text: 'GraphQL', disabled: true },
      ],
    },
    {
      icon: 'fa fa-pie-chart',
      text: 'Data Visualization',
      disabled: true,
      model: false,
      children: [
        { text: 'Chart', disabled: true },
        { text: 'Map', disabled: true },
      ],
    },
    {
      icon: 'av_timer',
      text: 'Realtime',
      disabled: true,
      model: false,
      children: [
        { text: 'Socket.IO', disabled: true },
        { text: 'GraphQL Subscriptions', disabled: true },
      ],
    },

    // Playground
    { icon: 'fa fa-calculator', text: 'Counter', route: '/counter', subheader: 'Playground' },
    { icon: 'photo_library', text: 'Gallery', route: '/gallery', disabled: true },
    { icon: 'fa fa-qrcode', text: 'QR Code', route: '/qrcode', disabled: true },
  ],
};
