// @flow

export interface Navigation {
  icon?: string;
  text?: string;
  route?: string;
  disabled?: boolean;
  subheader?: string;
  children?: Navigation[];
}

export interface IApp {
  navigation: Navigation[];
  drawer: boolean;
  languages?: Array<{ key: string, label: string }>;
}

export interface IComponent {}

export const INITIAL: IApp = {
  navigation: [
    // Basic
    { icon: 'face', text: 'helloWorld', route: '/hello-world', subheader: 'basic' },
    {
      icon: 'loyalty',
      text: '101 Guide',
      children: [
        {
          text: 'Components',
          children: [
            { text: 'Module Systems', route: '/foo' },
            { text: 'Props', route: '/foo' },
            { text: 'Slots', route: '/foo' },
          ],
        },
        {
          text: 'Directives',
          children: [
            { text: 'Switch', route: '/foo' },
          ],
        },
        {
          text: 'Filters',
          children: [
            { text: 'Async', route: '/foo' },
          ],
        },
        {
          text: 'Router',
          children: [
            { text: 'Params', route: '/foo' },
            { text: 'Guards', route: '/foo' },
          ],
        },
      ],
    },
    {
      icon: 'business',
      text: 'CRUD Operations',
      children: [
        { text: 'Basic', route: '/crud-operations/basic' },
        { text: 'REST', route: '/crud-operations/rest' },
        { text: 'GraphQL', disabled: true },
      ],
    },
    {
      icon: 'contacts',
      text: 'Form Controls',
      children: [
        { text: 'Text Fields', route: '/form-controls/text-fields' },
        { text: 'Selects', route: '/form-controls/selects' },
        { text: 'Selection Controls', route: '/form-controls/selection-controls' },
        { text: 'Pickers', route: '/form-controls/pickers', disabled: true },
      ],
    },

    // Advanced
    {
      icon: 'loyalty',
      text: '201 Guide',
      disabled: true,
      subheader: 'advanced',
      children: [],
    },
    {
      icon: 'fa fa-table',
      text: 'Data Table',
      disabled: true,
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
      children: [
        { text: 'REST', disabled: true },
        { text: 'GraphQL', disabled: true },
      ],
    },
    {
      icon: 'fa fa-pie-chart',
      text: 'Data Visualization',
      disabled: true,
      children: [
        { text: 'Chart', disabled: true },
        { text: 'Map', disabled: true },
      ],
    },
    {
      icon: 'av_timer',
      text: 'Realtime',
      disabled: true,
      children: [
        { text: 'Socket.IO', disabled: true },
        { text: 'GraphQL Subscriptions', disabled: true },
      ],
    },

    // Playground
    { icon: 'fa fa-calculator', text: 'counter', route: '/counter', subheader: 'playground' },
    { icon: 'photo_library', text: 'Gallery', route: '/gallery', disabled: true },
    { icon: 'fa fa-qrcode', text: 'QR Code', route: '/qrcode', disabled: true },
  ],

  drawer: null,  // eslint-disable-line

  languages: [
    { key: 'en', label: 'English' },
    { key: 'zh', label: '中文' },
    { key: 'ja', label: '日本語' },
  ],
};
