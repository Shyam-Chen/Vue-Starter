import { createWebHistory, createRouter } from 'vue-router';

import auth from '~/middleware/auth';
import componentsRoutes from '~/modules/components/routes';

export const history = createWebHistory();

export const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      redirect(to) {
        if (localStorage.getItem('token')) return { path: '/dashboard' };
        return { path: '/sign-in' };
      },
    },

    {
      path: '/sign-in',
      component: () => import('~/modules/sign-in/Registry.vue'),
      meta: { layout: 'center' },
    },
    {
      path: '/dashboard',
      component: () => import('~/modules/dashboard/Registry.vue'),
      meta: { layout: 'default' },
      beforeEnter: [auth],
    },

    ...componentsRoutes,

    {
      path: '/navigation/breadcrumbs',
      component: () => import('~/modules/navigation/breadcrumbs/Registry.vue'),
      meta: { layout: 'default' },
      beforeEnter: [auth],
    },

    {
      path: '/forms/text-fields',
      component: () => import('~/modules/forms/text-fields/Registry.vue'),
      meta: { layout: 'default' },
      beforeEnter: [auth],
    },
    {
      path: '/forms/checkboxes',
      component: () => import('~/modules/forms/checkboxes/Registry.vue'),
      meta: { layout: 'default' },
      beforeEnter: [auth],
    },
    {
      path: '/forms/radio-buttons',
      component: () => import('~/modules/forms/radio-buttons/Registry.vue'),
      meta: { layout: 'default' },
      beforeEnter: [auth],
    },
    {
      path: '/forms/switches',
      component: () => import('~/modules/forms/switches/Registry.vue'),
      meta: { layout: 'default' },
      beforeEnter: [auth],
    },
    {
      path: '/forms/selects/single-selects',
      component: () => import('~/modules/forms/selects/single-selects/Registry.vue'),
      meta: { layout: 'default' },
      beforeEnter: [auth],
    },
    {
      path: '/forms/form-validation',
      component: () => import('~/modules/forms/form-validation/Registry.vue'),
      meta: { layout: 'default' },
      beforeEnter: [auth],
    },

    {
      path: '/charts/line-charts',
      component: () => import('~/modules/charts/line-charts/Registry.vue'),
      meta: { layout: 'default' },
      beforeEnter: [auth],
    },

    {
      path: '/network/eventsource',
      component: () => import('~/modules/network/eventsource/Registry.vue'),
      meta: { layout: 'default' },
      beforeEnter: [auth],
    },

    {
      path: '/:pathMatch(.*)*',
      component: () => import('~/Error.vue'),
      meta: { error: true },
    },
  ],
});
