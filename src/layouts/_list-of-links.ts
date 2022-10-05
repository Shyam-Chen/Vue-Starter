export interface Link {
  name?: string;
  to?: string;
  permissions?: Array<'A' | 'B' | 'C' | 'D' | 'E'>;
  aiDisable?: boolean; // '1' 支援、'0' 不支援，從 sessionStorage 取
  sub?: Link[];
}

export default [
  { name: 'Dashboard', to: '/dashboard' },
  {
    name: 'Components',
    sub: [
      { name: 'Buttons', to: '/components/buttons' },
      { name: 'Grid System', to: '/components/grid-system' },
      { name: 'Icons', to: '/components/icons' },
    ],
  },
  {
    name: 'Forms',
    sub: [
      { name: 'Regular Forms', to: '/forms/regular-forms' },
      { name: 'Form Validation', to: '/forms/form-validation' },
    ],
  },
  {
    name: 'Charts',
    sub: [
      {
        name: 'Line Charts',
        sub: [{ name: 'Basic Line' }],
      },
      {
        name: 'Area Charts',
        sub: [{ name: 'Basic Area' }, { name: 'Area Range' }],
      },
    ],
  },
] as Link[];
