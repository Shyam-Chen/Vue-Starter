import { createWebHistory, createRouter } from 'vue-router';

import auth from '~/middleware/auth';

export const history = createWebHistory();

export const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      redirect(to) {
        if (sessionStorage.getItem('token')) return { path: '/dashboard' };
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

    {
      path: '/components/buttons',
      component: () => import('~/modules/components/buttons/Registry.vue'),
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
      path: '/:pathMatch(.*)*',
      component: () => import('~/Error.vue'),
      meta: { error: true },
    },
  ],
});
