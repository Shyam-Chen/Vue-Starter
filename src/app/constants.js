// @flow

import { IApp } from './types';

export const INITIAL: IApp = {
  theme: localStorage.getItem('theme') || 'light',
  navigation: [
    /** @name practical-examples */
    { icon: 'pageview', text: 'overview', route: '/overview', subheader: 'practicalExamples' },
    { icon: 'face', text: 'helloWorld', route: '/hello-world' },
    {
      icon: 'loyalty',
      text: 'guide',
      route: '/guide',
      children: [
        { text: 'templateRendering', route: '/guide/template-rendering' },
        {
          text: 'components',
          children: [
            { text: 'props', route: '/guide/components/props' },
            { text: 'slots', route: '/guide/components/slots' },
            { text: 'refs', route: '/guide/components/refs' },
            { text: 'customEvents', route: '/guide/components/custom-events' },
            { text: 'extends', route: '/guide/components/extends', disabled: true },
            { text: 'dynamic', route: '/guide/components/dynamic' },
          ],
        },
        { text: 'lifecycleHooks', route: '/guide/lifecycle-hooks' },
        { text: 'transitions', route: '/guide/transitions' },
        { text: 'mixins', route: '/guide/mixins' },
        { text: 'directives', route: '/guide/directives' },
        { text: 'dependencyInjection', route: '/guide/dependency-injection' },
        { text: 'filters', route: '/guide/filters' },
        {
          text: 'routing',
          children: [
            { text: 'dynamicMatching', route: '/guide/routing/dynamic-matching' },
            { text: 'nestedRoutes', route: '/guide/routing/nested-routes' },
            { text: 'guards', route: '/guide/routing/guards' },
          ],
        },
        { text: 'stateManagement', route: '/guide/state-management' },
      ],
    },
    {
      icon: 'business',
      text: 'crudOperations',
      route: '/crud-operations',
      children: [
        { text: 'basic', route: '/crud-operations/basic' },
        { text: 'rest', route: '/crud-operations/rest' },
        { text: 'graphql', route: '/crud-operations/graphql' },
      ],
    },
    {
      icon: 'contacts',
      text: 'formControls',
      route: '/form-controls',
      children: [
        { text: 'textFields', route: '/form-controls/text-fields' },
        { text: 'selects', route: '/form-controls/selects' },
        { text: 'selectionControls', route: '/form-controls/selection-controls' },
        { text: 'pickers', route: '/form-controls/pickers' },
        { text: 'autocomplete', route: '/form-controls/autocomplete', disabled: true },
        { text: 'stepper', route: '/form-controls/stepper', disabled: true },
        { text: 'tabs', route: '/form-controls/tabs', disabled: true },
        { text: 'treeView', route: '/form-controls/tree-view', disabled: true },
        { text: 'markdownEditor', route: '/form-controls/markdown-editor' },
        { text: 'richTextEditor', route: '/form-controls/rich-text-editor', disabled: true },
      ],
    },
    {
      icon: 'fas fa-table',
      text: 'dataTable',
      route: '/data-table',
      children: [
        { text: 'displayRows', route: '/data-table/display-rows' },
        { text: 'inlineEdit', route: '/data-table/inline-edit', disabled: true },
        { text: 'paginator', route: '/data-table/paginator' },
        { text: 'iterator', route: '/data-table/iterator' },
        { text: 'exportReport', route: '/data-table/export-report', disabled: true },
      ],
    },
    { icon: 'language', text: 'internationalization', route: '/internationalization' },
    { icon: 'fas fa-chart-bar', text: 'dataVisualization', route: '/data-visualization' },
    { icon: 'verified_user', text: 'authorization', route: '/authorization' },
    { icon: 'far fa-credit-card', text: 'payment', route: '/payment' },
    {
      icon: 'message',
      text: 'messages',
      route: '/messages',
      children: [
        { text: 'chatRoom', route: '/messages/chat-room' },
        { text: 'email', route: '/messages/email', disabled: true },
        { text: 'cloudMessaging', route: '/messages/cloud-messaging', disabled: true },
      ],
    },
    { icon: 'fas fa-cogs', text: 'machineLearning', route: '/machine-learning' },

    /** @name additional-resources */
    { icon: 'fas fa-server', text: 'universalApps', href: 'https://github.com/Shyam-Chen/Vue-Universal-Starter', subheader: 'additionalResources', divider: true },
    { icon: 'phone_iphone', text: 'mobileApps', href: 'https://github.com/Shyam-Chen/Vue-Mobile-Starter' },
    { icon: 'desktop_mac', text: 'desktopApps', href: 'https://github.com/Shyam-Chen/Vue-Desktop-Starter' },
  ],
  drawer: false || null,
  languages: [
    { key: 'en', country: 'us', label: 'English' },
    { key: 'zh', country: 'cn', label: '中文' },
    { key: 'ja', country: 'jp', label: '日本語' },
  ],
};
