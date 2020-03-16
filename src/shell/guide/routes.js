export default [
  { path: '/guide', redirect: '/guide/template-rendering' },
  {
    path: '/guide/template-rendering',
    component: () => import('~/shell/guide/template-rendering/TemplateRendering'),
  },
  {
    path: '/guide/components/props',
    component: () => import('~/shell/guide/components/props/Props'),
  },
  {
    path: '/guide/components/slots',
    component: () => import('~/shell/guide/components/slots/Slots'),
  },
  {
    path: '/guide/components/refs',
    component: () => import('~/shell/guide/components/refs/Refs'),
  },
  {
    path: '/guide/components/custom-events',
    component: () => import('~/shell/guide/components/custom-events/CustomEvents'),
  },
  {
    path: '/guide/components/dynamic',
    component: () => import('~/shell/guide/components/dynamic/Dynamic'),
  },
  {
    path: '/guide/components/recursion',
    component: () => import('~/shell/guide/components/recursion/Recursion'),
  },
  {
    path: '/guide/lifecycle-hooks',
    component: () => import('~/shell/guide/lifecycle-hooks/LifecycleHooks'),
  },
  {
    path: '/guide/transitions',
    component: () => import('~/shell/guide/transitions/Transitions'),
  },
  { path: '/guide/mixins', component: () => import('~/shell/guide/mixins/Mixins') },
  {
    path: '/guide/directives',
    component: () => import('~/shell/guide/directives/Directives'),
  },
  {
    path: '/guide/dependency-injection',
    component: () => import('~/shell/guide/dependency-injection/DependencyInjection'),
  },
  { path: '/guide/filters', component: () => import('~/shell/guide/filters/Filters') },
  {
    path: '/guide/routing/dynamic-matching',
    component: () => import('~/shell/guide/routing/dynamic-matching/DynamicMatching'),
  },
  {
    path: '/guide/routing/dynamic-matching/:username',
    component: () => import('~/shell/guide/routing/dynamic-matching/UserInfo'),
  },
  {
    path: '/guide/routing/nested-routes',
    component: () => import('~/shell/guide/routing/nested-routes/NestedRoutes'),
    children: [
      { path: '', component: () => import('~/shell/guide/routing/nested-routes/Default') },
      { path: 'first', component: () => import('~/shell/guide/routing/nested-routes/First') },
      { path: 'second', component: () => import('~/shell/guide/routing/nested-routes/Second') },
    ],
  },
  {
    path: '/guide/routing/guards',
    component: () => import('~/shell/guide/routing/guards/Guards'),
    beforeEnter(to, from, next) {
      next();
    },
  },
  {
    path: '/guide/routing/guards/:id',
    component: () => import('~/shell/guide/routing/guards/Guards'),
    beforeEnter(to, from, next) {
      next();
    },
  },
  {
    path: '/guide/state-management',
    component: () => import('~/shell/guide/state-management/StateManagement'),
  },
];
