import { createWebHistory, createRouter } from 'vue-router';

import auth from '~/middleware/auth';
import componentsRoutes from '~/modules/components/routes';
import navigationRoutes from '~/modules/navigation/routes';
import formsRoutes from '~/modules/forms/routes';
import chartsRoutes from '~/modules/charts/routes';
import networkRoutes from '~/modules/network/routes';

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

    ...chartsRoutes,

    ...networkRoutes,

    {
      path: '/:pathMatch(.*)*',
      component: () => import('~/Error.vue'),
      meta: { layout: 'empty' },
    },
  ],
});
