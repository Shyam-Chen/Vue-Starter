# Modules Directory

Defines a folder-based routing to create routes with Domain-driven Design.

## Usage

Define path rules:

```coffee
modules/marketing/Registry.vue -> /marketing

modules/auth/login/Registry.vue -> /auth/login
modules/auth/signup/Registry.vue -> /auth/signup

modules/products/Registry.vue -> /products
modules/products/[id]/Registry.vue -> /products/:id
modules/students/[id]/[name]/Registry.vue -> /students/:id/:name

modules/(marketing)/about/Registry.vue -> /about
modules/(app)/dashboard/Registry.vue -> /dashboard

modules/post/[...rest]/Registry.vue -> /post/*rest # /post/2020/id/title
```

### Feature Modules

```ts
// src/plugins/router.ts
routes: [
  {
    path: '/marketing',
    component: () => import('~/modules/marketing/Registry.vue'),
  },

  {
    path: '/auth/login',
    component: () => import('~/modules/auth/login/Registry.vue'),
  },
  {
    path: '/auth/signup',
    component: () => import('~/modules/auth/signup/Registry.vue'),
  },

  {
    path: '/products',
    component: () => import('~/modules/products/Registry.vue'),
  },
  {
    path: '/products/:id',
    component: () => import('~/modules/products/[id]/Registry.vue'),
  },
],
```

### Feature Module Group

```ts
// src/modules/auth/routes.ts
import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/auth/login',
    component: () => import('~/modules/auth/login/Registry.vue'),
  },
  {
    path: '/auth/signup',
    component: () => import('~/modules/auth/signup/Registry.vue'),
  },
] as RouteRecordRaw[];
```

```ts
// src/modules/products/routes.ts
import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/products',
    component: () => import('~/modules/products/Registry.vue'),
  },
  {
    path: '/products/:id',
    component: () => import('~/modules/products/[id]/Registry.vue'),
  },
] as RouteRecordRaw[];
```

```ts
// src/plugins/router.ts
import authRoutes from '~/modules/auth/routes'; // [!code ++]
import productsRoutes from '~/modules/products/routes'; // [!code ++]

routes: [
  {
    path: '/marketing',
    component: () => import('~/modules/marketing/Registry.vue'),
  },

  { // [!code --]
    path: '/auth/login', // [!code --]
    component: () => import('~/modules/auth/login/Registry.vue'), // [!code --]
  }, // [!code --]
  { // [!code --]
    path: '/auth/signup', // [!code --]
    component: () => import('~/modules/auth/signup/Registry.vue'), // [!code --]
  }, // [!code --]
  ...authRoutes, // [!code ++]

  { // [!code --]
    path: '/products', // [!code --]
    component: () => import('~/modules/products/Registry.vue'), // [!code --]
  }, // [!code --]
  { // [!code --]
    path: '/products/:id', // [!code --]
    component: () => import('~/modules/products/[id]/Registry.vue'), // [!code --]
  }, // [!code --]
  ...productsRoutes, // [!code ++]
],
```
