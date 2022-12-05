# Getting Started

## How to define route

```coffee
modules/marketing/Registry.vue     -> /marketing

modules/auth/login/Registry.vue    -> /auth/login
modules/auth/signup/Registry.vue   -> /auth/signup

modules/products/Registry.vue      -> /products
modules/products/new/Registry.vue  -> /products/new
modules/products/[id]/Registry.vue -> /products/:id
```

Feature Modules

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
    path: '/products/new',
    component: () => import('~/modules/products/new/Registry.vue'),
  },
  {
    path: '/products/:id',
    component: () => import('~/modules/products/[id]/Registry.vue'),
  },
],
```

Feature Module Group

```ts
// src/plugins/router.ts
routes: [
  {
    path: '/marketing',
    component: () => import('~/modules/marketing/Registry.vue'),
  },

  ...authRoutes,
  ...productsRoutes,
],
```

Nested Feature Module Group

```ts

```

## Foo

```js
export default {
  // ...
};
```

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## Bar

```js
export default {
  // ...
};
```

```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```

## Baz

```js
export default {
  // ...
};
```

```js
export default {
  data() {
    return {
      msg: 'Highlighted!', // [!code hl]
    };
  },
};
```
