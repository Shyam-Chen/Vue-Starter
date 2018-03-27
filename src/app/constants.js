export const INITIAL = {
  drawer: null,
  navigation: [
    { icon: 'home', text: 'Home', route: '/' },

    { icon: 'face', text: 'Hello World', route: '/hello-world', subheader: 'Basic' },

    {
      icon: 'business',
      text: 'CRUD Operations',
      subheader: 'Advanced',
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
        { text: 'Reactive', disabled: true },
      ],
    },
    {
      icon: 'fa fa-table',
      text: 'Data Table',
      model: false,
      children: [
        { text: 'Basic', disabled: true },
        { text: 'REST', disabled: true },
        { text: 'GraphQL', disabled: true },
      ],
    },
    {
      icon: 'language',
      text: 'Globalization',
      model: false,
      children: [
        { text: 'Internationalization', route: '/i18n' },
        { text: 'Localization', disabled: true },
      ],
    },
    {
      icon: 'verified_user',
      text: 'Authorization',
      model: false,
      children: [
        { text: 'REST', disabled: true },
        { text: 'GraphQL', disabled: true },
      ],
    },
    {
      icon: 'multiline_chart',
      text: 'Data Visualization',
      model: false,
      children: [
        { text: 'Chart', disabled: true },
        { text: 'Map', disabled: true },
      ],
    },
    {
      icon: 'av_timer',
      text: 'Realtime',
      model: false,
      children: [
        { text: 'Socket.IO', disabled: true },
        { text: 'GraphQL Subscriptions', disabled: true },
      ],
    },

    { icon: 'face', text: 'Counter', route: '/counter', subheader: 'Playground' },
  ],
};
