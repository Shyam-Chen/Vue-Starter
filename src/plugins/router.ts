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
      beforeEnter: [auth],
    },

    {
      path: '/:pathMatch(.*)*',
      component: () => import('~/Error.vue'),
      meta: { error: true },
    },
  ],
});
