import type { RouteRecordRaw } from 'vue-router';

import auth from '~/middleware/auth';

export default [
  {
    path: '/data-display/badge',
    component: () => import('~/modules/data-display/badge/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-display/chip',
    component: () => import('~/modules/data-display/chip/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-display/expansion-panels',
    component: () => import('~/modules/data-display/expansion-panels/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-display/popover',
    component: () => import('~/modules/data-display/popover/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-display/data-tables',
    component: () => import('~/modules/data-display/data-tables/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-display/data-iterators',
    component: () => import('~/modules/data-display/data-iterators/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-display/tabular-forms',
    component: () => import('~/modules/data-display/tabular-forms/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-display/tabular-form-groups',
    component: () => import('~/modules/data-display/tabular-form-groups/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-display/calendar',
    component: () => import('~/modules/data-display/calendar/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-display/timeline',
    component: () => import('~/modules/data-display/timeline/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
  {
    path: '/data-display/tooltip',
    component: () => import('~/modules/data-display/tooltip/Registry.vue'),
    meta: { layout: 'default' },
    beforeEnter: [auth],
  },
] as RouteRecordRaw[];
