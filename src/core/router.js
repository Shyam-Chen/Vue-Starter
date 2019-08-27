import Vue from 'vue';
import Router from 'vue-router';
import RouterPrefetch from 'vue-router-prefetch';
import Meta from 'vue-meta';
import Analytics from 'vue-analytics';

import guide from '~/shell/guide/routes';
import crudOperations from '~/shell/crud-operations/routes';
import controls from '~/shell/controls/routes';

Vue.use(Router);
Vue.use(RouterPrefetch);
Vue.use(Meta);

const router = new Router({
  mode: 'history',
  base: process.env.APP_BASE,
  routes: [
    { path: '/', redirect: `/${sessionStorage.getItem('lang') || 'en'}`},
    {
      path: '/:lang([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})',
      component: () => import('~/App'),
      children: [
        { path: '', component: () => import('~/home/Home'), meta: { home: true } },
        { path: 'overview', component: () => import('~/shell/overview/Overview') },
        { path: 'hello-world', component: () => import('~/shell/hello-world/HelloWorld') },
        { path: '*', component: () => import('~/error/not-found/NotFound'), meta: { standalone: true } },
      ],
    },
    // { path: '/', component: Home, meta: { home: true } },

    // { path: '/dashboard', component: () => import('~/dashboard/Dashboard') },

    // { path: '/overview', component: () => import('~/shell/overview/Overview') },
    // { path: '/hello-world', component: () => import('~/shell/hello-world/HelloWorld') },

    // ...guide,

    // ...crudOperations,

    // ...controls,

    // { path: '/data-table', redirect: '/data-table/display-rows' },
    // { path: '/data-table/display-rows', component: () => import('~/shell/data-table/display-rows/DisplayRows') },
    // { path: '/data-table/paginator', component: () => import('~/shell/data-table/paginator/Paginator') },
    // { path: '/data-table/iterator', component: () => import('~/shell/data-table/iterator/Iterator') },

    // { path: '/internationalization', component: () => import('~/shell/internationalization/Internationalization') },

    // { path: '/data-visualization', component: () => import('~/shell/data-visualization/DataVisualization') },

    // { path: '/authorization', component: () => import('~/shell/authorization/Authorization') },
    // { path: '/authorization/login', component: () => import('~/shell/authorization/Login'), meta: { standalone: true } },
    // { path: '/authorization/register', component: () => import('~/shell/authorization/Register'), meta: { standalone: true } },

    // { path: '/payment', component: () => import('~/shell/payment/Payment') },

    // { path: '/messages', redirect: '/messages/chat-room' },
    // { path: '/messages/chat-room', component: () => import('~/shell/messages/chat-room/ChatRoom') },

    // { path: '/machine-learning', component: () => import('~/shell/machine-learning/MachineLearning') },

    { path: '*', component: () => import('~/error/not-found/NotFound'), meta: { standalone: true } },
  ],
  async scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return { x: 0, y: 0 };

    // if (document.readyState !== 'complete') {
    //   await new Promise((resolve) => {
    //     const callback = () => {
    //       window.requestAnimationFrame(resolve);
    //       window.removeEventListener('load', callback);
    //     };

    //     window.addEventListener('load', callback);
    //   });
    // }

    // if (to.hash) return { selector: to.hash };
    // if (savedPosition) return savedPosition;

    // return new Promise((resolve) => {
    //   setTimeout(() => resolve({ y: 0 }), 200);
    // });
  },
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    // progress.start();
  }

  next();
});

router.afterEach(() => {
  // progress.done();
});

Vue.use(Analytics, {
  id: process.env.GOOGLE_ANALYTICS || 'UA-XXXXXXXX-X',
  router,
  autoTracking: {
    page: process.env.NODE_ENV === 'production',
  },
});

export default router;
