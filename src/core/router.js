import Vue from 'vue';
import Router from 'vue-router';
import RouterPrefetch from 'vue-router-prefetch';
import Meta from 'vue-meta';
import Analytics from 'vue-analytics';

import Home from '~/home/Home';
import NotFound from '~/not-found/NotFound';

import guide from '~/shell/guide/routes';

Vue.use(Router);
Vue.use(RouterPrefetch);
Vue.use(Meta);

const router = new Router({
  mode: 'history',
  base: process.env.APP_BASE,
  routes: [
    { path: '/', component: Home, meta: { home: true } },

    // { path: '/dashboard', component: () => import('~/dashboard/Dashboard') },

    /** @name overview */
    { path: '/overview', component: () => import('~/shell/overview/Overview') },

    /** @name hello-world */
    { path: '/hello-world', component: () => import('~/shell/hello-world/HelloWorld') },

    /** @name guide */
    ...guide,

    /** @name crud-operations */
    { path: '/crud-operations', redirect: '/crud-operations/basic' },
    { path: '/crud-operations/basic', component: () => import('~/shell/crud-operations/basic/Basic') },
    { path: '/crud-operations/rest', component: () => import('~/shell/crud-operations/rest/REST') },
    { path: '/crud-operations/graphql', component: () => import('~/shell/crud-operations/graphql/GraphQL') },

    /** @name controls */
    { path: '/controls', redirect: '/controls/text-fields' },
    { path: '/controls/text-fields', component: () => import('~/shell/controls/text-fields/TextFields') },
    { path: '/controls/selects', component: () => import('~/shell/controls/selects/Selects') },
    { path: '/controls/selection-controls', component: () => import('~/shell/controls/selection-controls/SelectionControls') },
    { path: '/controls/pickers', component: () => import('~/shell/controls/pickers/Pickers') },
    { path: '/controls/autocomplete', component: () => import('~/shell/controls/autocomplete/Autocomplete') },
    { path: '/controls/stepper', component: () => import('~/shell/controls/stepper/Stepper') },
    { path: '/controls/tree-view', component: () => import('~/shell/controls/tree-view/TreeView') },
    { path: '/controls/calendar', component: () => import('~/shell/controls/calendar/Calendar') },
    { path: '/controls/markdown-editor', component: () => import('~/shell/controls/markdown-editor/MarkdownEditor') },

    /** @name data-table */
    { path: '/data-table', redirect: '/data-table/display-rows' },
    { path: '/data-table/display-rows', component: () => import('~/shell/data-table/display-rows/DisplayRows') },
    { path: '/data-table/paginator', component: () => import('~/shell/data-table/paginator/Paginator') },
    { path: '/data-table/iterator', component: () => import('~/shell/data-table/iterator/Iterator') },

    /** @name internationalization */
    { path: '/internationalization', component: () => import('~/shell/internationalization/Internationalization') },

    /** @name data-visualization */
    { path: '/data-visualization', component: () => import('~/shell/data-visualization/DataVisualization') },

    /** @name authorization */
    { path: '/authorization', component: () => import('~/shell/authorization/Authorization') },
    { path: '/authorization/login', component: () => import('~/shell/authorization/Login'), meta: { standalone: true } },
    // { path: '/authorization/register', component: () => import('~/shell/authorization/Register'), meta: { standalone: true } },

    /** @name payment */
    { path: '/payment', component: () => import('~/shell/payment/Payment') },

    /** @name messages */
    { path: '/messages', redirect: '/messages/chat-room' },
    { path: '/messages/chat-room', component: () => import('~/shell/messages/chat-room/ChatRoom') },

    /** @name machine-learning */
    { path: '/machine-learning', component: () => import('~/shell/machine-learning/MachineLearning') },

    { path: '*', component: NotFound, meta: { standalone: true } },
  ],
  async scrollBehavior(to, from, savedPosition) {
    if (document.readyState !== 'complete') {
      await new Promise((resolve) => {
        const callback = () => {
          window.requestAnimationFrame(resolve);
          window.removeEventListener('load', callback);
        };

        window.addEventListener('load', callback);
      });
    }

    if (to.hash) return { selector: to.hash };
    if (savedPosition) return savedPosition;

    return new Promise((resolve) => {
      setTimeout(() => resolve({ y: 0 }), 200);
    });
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
