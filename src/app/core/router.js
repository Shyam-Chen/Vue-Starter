import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import Analytics from 'vue-analytics';

import Home from '~/home/Home';
import NotFound from '~/not-found/NotFound';

Vue.use(Router);
Vue.use(Meta);

const router = new Router({
  mode: 'history',
  base: process.env.APP_BASE,
  routes: [
    { path: '/', component: Home, meta: { home: true } },

    /** @name overview */
    { path: '/overview', component: () => import('~/overview/Overview') },

    /** @name hello-world */
    { path: '/hello-world', component: () => import('~/hello-world/HelloWorld') },

    /** @name guide */
    { path: '/guide', redirect: '/guide/template-rendering' },
    { path: '/guide/template-rendering', component: () => import('~/guide/template-rendering/TemplateRendering') },
    { path: '/guide/components/props', component: () => import('~/guide/components/props/Props') },
    { path: '/guide/components/slots', component: () => import('~/guide/components/slots/Slots') },
    { path: '/guide/components/refs', component: () => import('~/guide/components/refs/Refs') },
    { path: '/guide/components/custom-events', component: () => import('~/guide/components/custom-events/CustomEvents') },
    { path: '/guide/components/dynamic', component: () => import('~/guide/components/dynamic/Dynamic') },
    { path: '/guide/lifecycle-hooks', component: () => import('~/guide/lifecycle-hooks/LifecycleHooks') },
    { path: '/guide/transitions', component: () => import('~/guide/transitions/Transitions') },
    { path: '/guide/mixins', component: () => import('~/guide/mixins/Mixins') },
    { path: '/guide/directives', component: () => import('~/guide/directives/Directives') },
    { path: '/guide/dependency-injection', component: () => import('~/guide/dependency-injection/DependencyInjection') },
    { path: '/guide/filters', component: () => import('~/guide/filters/Filters') },
    { path: '/guide/routing/dynamic-matching', component: () => import('~/guide/routing/dynamic-matching/DynamicMatching') },
    { path: '/guide/routing/dynamic-matching/:username', component: () => import('~/guide/routing/dynamic-matching/UserInfo') },
    {
      path: '/guide/routing/nested-routes',
      component: () => import('~/guide/routing/nested-routes/NestedRoutes'),
      children: [
        { path: '', component: () => import('~/guide/routing/nested-routes/Default') },
        { path: 'first', component: () => import('~/guide/routing/nested-routes/First') },
        { path: 'second', component: () => import('~/guide/routing/nested-routes/Second') },
      ],
    },
    {
      path: '/guide/routing/guards',
      component: () => import('~/guide/routing/guards/Guards'),
      beforeEnter(to, from, next) {
        next();
      },
    },
    {
      path: '/guide/routing/guards/:id',
      component: () => import('~/guide/routing/guards/Guards'),
      beforeEnter(to, from, next) {
        next();
      },
    },
    { path: '/guide/state-management', component: () => import('~/guide/state-management/StateManagement') },

    /** @name crud-operations */
    { path: '/crud-operations', redirect: '/crud-operations/basic' },
    { path: '/crud-operations/basic', component: () => import('~/crud-operations/basic/Basic') },
    { path: '/crud-operations/rest', component: () => import('~/crud-operations/rest/REST') },
    { path: '/crud-operations/graphql', component: () => import('~/crud-operations/graphql/GraphQL') },

    /** @name form-controls */
    { path: '/form-controls', redirect: '/form-controls/text-fields' },
    { path: '/form-controls/text-fields', component: () => import('~/form-controls/text-fields/TextFields') },
    { path: '/form-controls/selects', component: () => import('~/form-controls/selects/Selects') },
    { path: '/form-controls/selection-controls', component: () => import('~/form-controls/selection-controls/SelectionControls') },
    { path: '/form-controls/pickers', component: () => import('~/form-controls/pickers/Pickers') },
    { path: '/form-controls/markdown-editor', component: () => import('~/form-controls/markdown-editor/MarkdownEditor') },

    /** @name data-table */
    { path: '/data-table', redirect: '/data-table/paginator' },
    { path: '/data-table/paginator', component: () => import('~/data-table/paginator/Paginator') },
    { path: '/data-table/iterator', component: () => import('~/data-table/iterator/Iterator') },

    /** @name internationalization */
    { path: '/internationalization', component: () => import('~/internationalization/Internationalization') },

    /** @name data-visualization */
    { path: '/data-visualization', component: () => import('~/data-visualization/DataVisualization') },

    /** @name authorization */
    { path: '/authorization', component: () => import('~/authorization/Authorization') },

    /** @name payment */
    { path: '/payment', component: () => import('~/payment/Payment') },

    /** @name messages */
    { path: '/messages', redirect: '/messages/chat-room' },
    { path: '/messages/chat-room', component: () => import('~/messages/chat-room/ChatRoom') },

    /** @name machine-learning */
    { path: '/machine-learning', component: () => import('~/machine-learning/MachineLearning') },

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

router.beforeEach((to, from, next) => {
  next();
});

Vue.use(Analytics, {
  id: process.env.GOOGLE_ANALYTICS || 'UA-XXXXXXXX-X',
  router,
  autoTracking: {
    page: process.env.NODE_ENV === 'production',
  },
});

export default router;
