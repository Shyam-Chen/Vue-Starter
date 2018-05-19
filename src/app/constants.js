// @flow

import { IApp } from './types';

export const INITIAL: IApp = {
  theme: localStorage.getItem('theme') || 'light',
  navigation: [
    { icon: 'pageview', text: 'overview', route: '/overview' },
    { icon: 'face', text: 'helloWorld', route: '/hello-world' },
    {
      icon: 'loyalty',
      text: 'guide',
      children: [
        { text: 'templateRendering', route: '/guide/template-rendering' },
        {
          text: 'components',
          children: [
            { text: 'props', route: '/guide/components/props' },
            { text: 'slots', route: '/guide/components/slots' },
          ],
        },
        { text: 'lifecycleHooks', route: '/guide/lifecycle-hooks' },
        { text: 'transitions', route: '/guide/transitions' },
        { text: 'mixins', route: '/guide/mixins' },
        { text: 'directives', route: '/guide/directives' },
        { text: 'filters', route: '/guide/filters' },
        {
          text: 'routing',
          children: [
            { text: 'dynamicMatching', route: '/guide/routing/dynamic-matching' },
            { text: 'nestedRoutes', route: '/guide/routing/nested-routes' },
            { text: 'guards', route: '/guide/routing/guards', disabled: true },
          ],
        },
        { text: 'stateManagement', route: '/guide/state-management' },
      ],
    },
    {
      icon: 'business',
      text: 'crudOperations',
      children: [
        { text: 'basic', route: '/crud-operations/basic' },
        { text: 'rest', route: '/crud-operations/rest' },
        { text: 'graphql', route: '/crud-operations/graphql' },
      ],
    },
    {
      icon: 'contacts',
      text: 'formControls',
      children: [
        { text: 'textFields', route: '/form-controls/text-fields' },
        { text: 'selects', route: '/form-controls/selects' },
        { text: 'selectionControls', route: '/form-controls/selection-controls' },
        { text: 'pickers', route: '/form-controls/pickers' },
      ],
    },
    {
      icon: 'fa fa-table',
      text: 'dataTable',
      children: [
        { text: 'paginator', route: '/data-table/paginator' },
        { text: 'iterator', route: '/data-table/iterator', disabled: true },
      ],
    },
    { icon: 'language', text: 'internationalization', route: '/internationalization' },
    { icon: 'fa fa-bar-chart', text: 'dataVisualization', route: '/data-visualization' },
    { icon: 'verified_user', text: 'authorization', route: '/authorization' },
    { icon: 'fa fa-credit-card', text: 'payment', route: '/payment', disabled: true },
    {
      icon: 'message',
      text: 'messages',
      disabled: true,
      children: [],
    },
    { icon: 'fa fa-cogs', text: 'machineLearning', route: '/machine-learning' },
  ],
  drawer: false || null,
  languages: [
    { key: 'en', country: 'us', label: 'English' },
    { key: 'zh', country: 'cn', label: '中文' },
    { key: 'ja', country: 'jp', label: '日本語' },
  ],
};
