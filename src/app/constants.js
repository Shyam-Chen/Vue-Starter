// @flow

import { IApp } from './types';

export const INITIAL: IApp = {
  theme: localStorage.getItem('theme') || 'light',
  navigation: [
    // Basic
    { icon: 'face', text: 'helloWorld', route: '/hello-world', subheader: 'basic' },
    {
      icon: 'loyalty',
      text: '101Guide',
      children: [
        {
          text: 'components',
          children: [
            { text: 'moduleSystems', route: '/foo', disabled: true },
            { text: 'props', route: '/101-guide/components/props' },
            { text: 'slots', route: '/101-guide/components/slots' },
          ],
        },
        {
          text: 'directives',
          children: [
            { text: 'switch', route: '/foo', disabled: true },
          ],
        },
        {
          text: 'filters',
          children: [
            { text: 'async', route: '/foo', disabled: true },
          ],
        },
        {
          text: 'router',
          children: [
            { text: 'params', route: '/foo', disabled: true },
            { text: 'guards', route: '/foo', disabled: true },
          ],
        },
      ],
    },
    {
      icon: 'business',
      text: 'crudOperations',
      children: [
        { text: 'basic', route: '/crud-operations/basic' },
        { text: 'rest', route: '/crud-operations/rest' },
        { text: 'graphql', disabled: true },
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
    { icon: 'language', text: 'internationalization', route: '/i18n' },

    // Advanced
    {
      icon: 'loyalty',
      text: '201Guide',
      disabled: true,
      subheader: 'advanced',
      children: [],
    },
    {
      icon: 'fa fa-table',
      text: 'dataTable',
      disabled: true,
      children: [
        { text: 'basic', disabled: true },
        { text: 'rest', disabled: true },
        { text: 'graphql', disabled: true },
      ],
    },
    { icon: 'fa fa-id-card', text: 'reactiveForms ', route: '/reactive-forms', disabled: true },
    {
      icon: 'verified_user',
      text: 'authorization',
      disabled: true,
      children: [
        { text: 'rest', disabled: true },
        { text: 'graphql', disabled: true },
      ],
    },
    {
      icon: 'fa fa-pie-chart',
      text: 'dataVisualization',
      disabled: true,
      children: [
        { text: 'chart', disabled: true },
        { text: 'map', disabled: true },
      ],
    },
    {
      icon: 'av_timer',
      text: 'realtime',
      disabled: true,
      children: [
        { text: 'socketio', disabled: true },
        { text: 'graphqlSubscriptions', disabled: true },
      ],
    },

    // Playground
    { icon: 'fa fa-calculator', text: 'counter', route: '/counter', subheader: 'playground' },
    { icon: 'photo_library', text: 'gallery', route: '/gallery', disabled: true },
    { icon: 'fa fa-qrcode', text: 'qrCode', route: '/qrcode', disabled: true },
  ],
  drawer: false || null,
  languages: [
    { key: 'en', label: 'English' },
    { key: 'zh', label: '中文' },
    { key: 'ja', label: '日本語' },
  ],
};
