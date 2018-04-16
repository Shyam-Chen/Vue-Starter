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
          text: 'transitions',
          children: [
            { text: 'state', route: '/foo', disabled: true },
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
          text: 'routing',
          children: [
            { text: 'params', route: '/foo', disabled: true },
            { text: 'guards', route: '/foo', disabled: true },
          ],
        },
        {
          text: 'stateManagement',
          children: [
            { text: 'modules', route: '/foo', disabled: true },
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
        { text: 'basic', route: '/data-table/basic' },
        { text: 'rest', disabled: true },
        { text: 'graphql', disabled: true },
      ],
    },
    { icon: 'language', text: 'internationalization', route: '/internationalization' },
    { icon: 'fa fa-bar-chart', text: 'interactiveChart', route: '/interactive-chart' },
    {
      icon: 'verified_user',
      text: 'authorization',
      disabled: true,
      children: [
        { text: 'rest', disabled: true },
        { text: 'graphql', disabled: true },
      ],
    },

    // Advanced
    {
      icon: 'loyalty',
      text: '201Guide',
      subheader: 'advanced',
      children: [
        { text: 'observables', route: '/foo', disabled: true },
      ],
    },
    {
      icon: 'av_timer',
      text: 'sockets',
      disabled: true,
      children: [],
    },
    { icon: 'video_library', text: 'torrents', disabled: true },
    { icon: 'fa fa-cube', text: 'virtualReality', disabled: true },
    { icon: 'fa fa-space-shuttle', text: 'machineLearning', disabled: true },
    { icon: 'fa fa-credit-card', text: 'payment', disabled: true },
    { icon: 'fa fa-heartbeat', text: 'neuralNetworks', disabled: true },
    { icon: 'fa fa-pencil-square-o', text: 'textEditor', disabled: true },

    // Playground
    { icon: 'fa fa-calculator', text: 'counter', route: '/counter', subheader: 'playground' },
    { icon: 'photo_library', text: 'gallery', route: '/gallery', disabled: true },
    { icon: 'fa fa-qrcode', text: 'qrCode', route: '/qrcode', disabled: true },
    { icon: 'store', text: 'store', route: '/store', disabled: true },
  ],
  drawer: false || null,
  languages: [
    { key: 'en', label: 'English' },
    { key: 'zh', label: '中文' },
    { key: 'ja', label: '日本語' },
  ],
};
