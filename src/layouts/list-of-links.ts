export interface Link {
  name: string;
  to?: string;
  permissions?: Array<'A' | 'B' | 'C' | 'D' | 'E'>;
  aiDisable?: boolean;
  sub?: Link[];
}

export default [
  { name: 'Dashboard', to: '/dashboard' },
  {
    name: 'Components',
    sub: [
      { name: 'Buttons', to: '/components/buttons' },
      { name: 'Dropdown', to: '/components/dropdown' },
      { name: 'Icons', to: '/components/icons' },
      { name: 'Dialogs', to: '/components/dialogs' },
    ],
  },
  {
    name: 'Navigation',
    sub: [
      { name: 'Breadcrumbs', to: '/navigation/breadcrumbs' },
      { name: 'Tabs', to: '/navigation/tabs' },
      { name: 'Steppers', to: '/navigation/steppers' },
    ],
  },
  {
    name: 'Forms',
    sub: [
      { name: 'Text fields', to: '/forms/text-fields' },
      { name: 'Checkboxes', to: '/forms/checkboxes' },
      { name: 'Radio buttons', to: '/forms/radio-buttons' },
      { name: 'Switches', to: '/forms/switches' },
      {
        name: 'Selects',
        sub: [
          { name: 'Single selects', to: '/forms/selects/single-selects' },
          { name: 'Multiple selects', to: '/forms/selects/multiple-selects' },
        ],
      },
      { name: 'Textareas', to: '/forms/textareas' },
      {
        name: 'Pickers',
        sub: [
          { name: 'Date pickers', to: '/forms/pickers/date-pickers' },
          { name: 'Month pickers', to: '/forms/pickers/month-pickers' },
          { name: 'Year pickers', to: '/forms/pickers/year-pickers' },
          { name: 'Time pickers', to: '/forms/pickers/time-pickers' },
        ],
      },
      { name: 'Autocompletes', to: '/forms/autocompletes' },
      { name: 'File inputs', to: '/forms/file-inputs' },
      { name: 'Form validation', to: '/forms/form-validation' },
    ],
  },
  {
    name: 'Tables',
    sub: [
      { name: 'Data tables', to: '/tables/data-tables' },
      { name: 'Data iterators', to: '/tables/data-iterators' },
      { name: 'Tabular forms', to: '/tables/tabular-forms' },
      { name: 'Tabular form groups', to: '/tables/tabular-form-groups' },
    ],
  },
  {
    name: 'State management',
    sub: [
      { name: 'Counter', to: '/state-management/counter' },
      { name: 'CRUD operations', to: '/state-management/crud-operations' },
    ],
  },
  {
    name: 'Charts',
    sub: [
      { name: 'Line charts', to: '/charts/line-charts' },
      { name: 'Area charts', to: '/charts/area-charts' },
      { name: 'Bar charts', to: '/charts/bar-charts' },
      { name: 'Pie charts', to: '/charts/pie-charts' },
      { name: 'Bubble charts', to: '/charts/bubble-charts' },
      { name: 'Combinations', to: '/charts/combinations' },
    ],
  },
  {
    name: 'Network',
    sub: [
      { name: 'Fetch', to: '/network/fetch' },
      { name: 'WebSocket', to: '/network/websocket' },
      { name: 'EventSource', to: '/network/eventsource' },
    ],
  },
] as Link[];
