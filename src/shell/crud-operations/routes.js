export default [
  { path: 'crud-operations', redirect: 'crud-operations/basic' },
  {
    path: 'crud-operations/basic',
    component: () => import('~/shell/crud-operations/basic/Basic'),
  },
  {
    path: 'crud-operations/rest',
    component: () => import('~/shell/crud-operations/rest/REST'),
  },
  {
    path: 'crud-operations/graphql',
    component: () => import('~/shell/crud-operations/graphql/GraphQL'),
  },
];
