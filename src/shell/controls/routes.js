export default [
  { path: 'controls', redirect: 'controls/text-fields' },
  {
    path: 'controls/text-fields',
    component: () => import('~/shell/controls/text-fields/TextFields'),
  },
  {
    path: 'controls/selects',
    component: () => import('~/shell/controls/selects/Selects'),
  },
  {
    path: 'controls/selection-controls',
    component: () =>
      import('~/shell/controls/selection-controls/SelectionControls'),
  },
  {
    path: 'controls/pickers',
    component: () => import('~/shell/controls/pickers/Pickers'),
  },
  {
    path: 'controls/autocomplete',
    component: () => import('~/shell/controls/autocomplete/Autocomplete'),
  },
  {
    path: 'controls/stepper',
    component: () => import('~/shell/controls/stepper/Stepper'),
  },
  {
    path: 'controls/tree-view',
    component: () => import('~/shell/controls/tree-view/TreeView'),
  },
  {
    path: 'controls/calendar',
    component: () => import('~/shell/controls/calendar/Calendar'),
  },
  {
    path: 'controls/markdown-editor',
    component: () => import('~/shell/controls/markdown-editor/MarkdownEditor'),
  },
];
