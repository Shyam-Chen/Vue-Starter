/* @unocss-include */

export interface Link {
  icon?: string;
  name: string;
  to?: string;
  permissions?: Array<'A' | 'B' | 'C' | 'D' | 'E'>;
  hidden?: boolean;
  sub?: Link[];

  level?: number;
  status?: boolean;
}

const links = [
  { icon: 'i-ic-round-dashboard', name: 'Dashboard', to: '/dashboard' },

  { name: 'Library' },
  { icon: 'i-mdi-cube-scan', name: 'Overview', to: '/overview' },
  {
    icon: 'i-mdi-bookmark-outline',
    name: 'General',
    sub: [
      { name: 'Button', to: '/general/buttons' },
      { name: 'Icons', to: '/general/icons' },
      { name: 'Paper', to: '/general/paper' },
      { name: 'Scrollbar', to: '/general/scrollbar' },
      { name: 'Typography', to: '/general/typography' },
    ],
  },
  {
    icon: 'i-ri-layout-3-line',
    name: 'Layout',
    sub: [
      { name: 'Aspect Ratio', to: '/layout/aspect-ratio' },
      { name: 'Divider', to: '/layout/dividers' },
      { name: 'Grid', to: '/layout/grid' },
      { name: 'HR', to: '/layout/hr' },
      { name: 'Panel', to: '/layout/panel' },
      { name: 'Spaces', to: '/layout/spaces' },
    ],
  },
  {
    icon: 'i-grommet-icons-navigate',
    name: 'Navigation',
    sub: [
      { name: 'Breadcrumb', to: '/navigation/breadcrumbs' },
      { name: 'Drawer', to: '/navigation/drawers' },
      { name: 'Dropdown', to: '/navigation/dropdown' },
      { name: 'Pagination', to: '/navigation/pagination' },
      { name: 'Scrollspy', to: '/navigation/scrollspy' },
      { name: 'Stepper', to: '/navigation/stepper' },
      { name: 'Tabs', to: '/navigation/tabs' },
      { name: 'Tour', to: '/navigation/tours' },
    ],
  },
  {
    icon: 'i-fluent-form-24-regular',
    name: 'Data Entry',
    sub: [
      { name: 'Autocomplete', to: '/data-entry/autocompletes' },
      { name: 'CheckboxGroup', to: '/data-entry/checkbox-group' },
      { name: 'Checkbox', to: '/data-entry/checkboxes' },
      { name: 'Editor', to: '/data-entry/editor' },
      { name: 'FileInput', to: '/data-entry/file-inputs' },
      { name: 'Form Validation', to: '/data-entry/form-validation' },
      { name: 'InputMask', to: '/data-entry/input-mask' },
      { name: 'Password', to: '/data-entry/password' },
      {
        name: 'Pickers',
        sub: [
          { name: 'DatePicker', to: '/data-entry/pickers/date-pickers' },
          { name: 'MonthPicker', to: '/data-entry/pickers/month-pickers' },
          { name: 'TimePicker', to: '/data-entry/pickers/time-pickers' },
          { name: 'YearPicker', to: '/data-entry/pickers/year-pickers' },
          { name: 'WeekPicker', to: '/data-entry/pickers/week-pickers' },
        ],
      },
      { name: 'RadioGroup', to: '/data-entry/radio-buttons' },
      {
        name: 'Selects',
        sub: [
          { name: 'Select', to: '/data-entry/selects/single-selects' },
          { name: 'Multiselect', to: '/data-entry/selects/multiple-selects' },
        ],
      },
      { name: 'Slider', to: '/data-entry/slider' },
      { name: 'Switch', to: '/data-entry/switches' },
      { name: 'TextField', to: '/data-entry/text-fields' },
      { name: 'Textarea', to: '/data-entry/textareas' },
      { name: 'Transfer', to: '/data-entry/transfer' },
    ],
  },
  {
    icon: 'i-codicon-table',
    name: 'Data Display',
    sub: [
      { name: 'Accordion', to: '/data-display/accordion' },
      { name: 'Avatar', to: '/data-display/avatar' },
      { name: 'Badge', to: '/data-display/badge' },
      { name: 'Calendar', to: '/data-display/calendar' },
      { name: 'Card', to: '/data-display/card' },
      { name: 'Carousel', to: '/data-display/carousel' },
      { name: 'Chip', to: '/data-display/chip' },
      { name: 'Infinite Scroll', to: '/data-display/infinite-scroll' },
      { name: 'Iterator', to: '/data-display/iterator' },
      { name: 'Popover', to: '/data-display/popover' },
      {
        name: 'Table',
        sub: [
          { name: 'Dynamic Table', to: '/data-display/table/dynamic-table' },
          { name: 'Static Table', to: '/data-display/table/static-table' },
        ],
      },
      { name: 'Tag', to: '/data-display/tag' },
      { name: 'Timeline', to: '/data-display/timeline' },
      { name: 'Tooltip', to: '/data-display/tooltip' },
      { name: 'Tree', to: '/data-display/tree' },
      { name: 'TreeTable', to: '/data-display/tree-table' },
      { name: 'Virtual Scroll', to: '/data-display/virtual-scroll' },
    ],
  },
  {
    icon: 'i-mdi-feedback-outline',
    name: 'Feedback',
    sub: [
      { name: 'Alert', to: '/feedback/alert' },
      { name: 'ChatBubble', to: '/feedback/chat-bubble' },
      { name: 'DeleteConfirmation', to: '/feedback/delete-confirmation' },
      { name: 'Dialogs', to: '/feedback/dialogs' },
      { name: 'Highlight', to: '/feedback/highlight' },
      { name: 'LeaveConfirmation', to: '/feedback/leave-confirmation' },
      { name: 'MeterGroup', to: '/feedback/meter-group' },
      { name: 'Notification', to: '/feedback/notification' },
      { name: 'Progress', to: '/feedback/progress' },
      { name: 'Skeletons', to: '/feedback/skeletons' },
    ],
  },
  {
    icon: 'i-bx-line-chart',
    name: 'Charts',
    sub: [
      { name: 'Line & Area', to: '/charts/line-area' },
      { name: 'Bar & Column', to: '/charts/bar-column' },
      { name: 'Pie & Donut', to: '/charts/pie-donut' },
      { name: 'Scatter & Bubble', to: '/charts/scatter-bubble' },
      { name: 'Mixed', to: '/charts/mixed' },
      { name: 'Map', to: '/charts/map' },
    ],
  },
  {
    icon: 'i-bi-hdd-network',
    name: 'Network',
    sub: [
      { name: 'Fetch', to: '/network/fetch' },
      { name: 'WebSocket', to: '/network/websocket' },
      { name: 'EventSource', to: '/network/eventsource' },
    ],
  },

  { name: 'Playground' },
  { icon: 'i-mdi-counter', name: 'Counter', to: '/counter' },
  {
    icon: 'i-carbon-cloud-service-management',
    name: 'CRUD Operations',
    to: '/crud-operations',
  },
  { icon: 'i-mdi-user-group', name: 'Management', to: '/user-list' },
  { icon: 'i-carbon-two-factor-authentication', name: 'Two-factor Auth', to: '/two-factor-auth' },
  { icon: 'i-ph-chats-fill', name: 'Discussions', to: '/discussions' },
] as Link[];

const createLevel = (arr: Link[], level = 1): Link[] => {
  return [...arr].map((item) => {
    if (item.sub) {
      return { ...item, level, sub: createLevel(item.sub, level + 1) };
    }

    return { ...item, level };
  });
};

export default createLevel(links);
