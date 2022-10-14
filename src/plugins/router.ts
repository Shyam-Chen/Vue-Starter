import { createWebHistory, createRouter } from 'vue-router';

import auth from '~/middleware/auth';
import componentsRoutes from '~/modules/components/routes';
import navigationRoutes from '~/modules/navigation/routes';
import formsRoutes from '~/modules/forms/routes';

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
    ...navigationRoutes,
    ...formsRoutes,

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
      meta: { layout: 'empty' },
    },
  ],
});
