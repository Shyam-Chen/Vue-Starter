import { createWebHistory, createRouter } from 'vue-router';

import auth from '~/middleware/auth';
import authRoutes from '~/modules/auth/routes';
import generalRoutes from '~/modules/general/routes';
import layoutRoutes from '~/modules/layout/routes';
import navigationRoutes from '~/modules/navigation/routes';
import dataEntryRoutes from '~/modules/data-entry/routes';
import dataDisplayRoutes from '~/modules/data-display/routes';
import feedbackRoutes from '~/modules/feedback/routes';
import stateManagementRoutes from '~/modules/state-management/routes';
import chartsRoutes from '~/modules/charts/routes';
import networkRoutes from '~/modules/network/routes';
import userListRoutes from '~/modules/user-list/routes';

export const history = createWebHistory();

export const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      redirect() {
        if (localStorage.getItem('accessToken')) return { path: '/dashboard' };
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

    ...authRoutes,
    ...generalRoutes,
    ...layoutRoutes,
    ...navigationRoutes,
    ...dataEntryRoutes,
    ...dataDisplayRoutes,
    ...feedbackRoutes,
    ...stateManagementRoutes,
    ...chartsRoutes,
    ...networkRoutes,
    ...userListRoutes,

    {
      path: '/:pathMatch(.*)*',
      component: () => import('~/Error.vue'),
      meta: { layout: 'empty' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { top: 0 };
  },
});
