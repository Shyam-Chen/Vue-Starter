// @flow

import { IApp } from './types';

export const INITIAL: IApp = {
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
            { text: 'recursion', route: '/guide/components/recursion' },
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
      text: 'controls',
      route: '/controls',
      children: [
        { text: 'textFields', route: '/controls/text-fields' },
        { text: 'selects', route: '/controls/selects' },
        { text: 'selectionControls', route: '/controls/selection-controls' },
        { text: 'pickers', route: '/controls/pickers' },
        { text: 'autocomplete', route: '/controls/autocomplete' },
        { text: 'stepper', route: '/controls/stepper' },
        { text: 'tabs', route: '/controls/tabs', disabled: true },
        { text: 'treeView', route: '/controls/tree-view' },
        { text: 'calendar', route: '/controls/calendar' },
        { text: 'markdownEditor', route: '/controls/markdown-editor' },
        { text: 'richTextEditor', route: '/controls/rich-text-editor', disabled: true },
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
  ],
  drawer: false || null,
  languages: [
    { key: 'en', label: 'English' },
    { key: 'zh-CN', label: '中文 (简体)' },
    { key: 'zh-TW', label: '中文 (正體)' },
    { key: 'ja', label: '日本語' },
    { key: 'ko', label: '한국어' },
  ],
};
