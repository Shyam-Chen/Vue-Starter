# Modules Directory

Defines a folder-based routing to create routes with Domain-driven Design.

## Routing

```
src/modules/marketing/Registry.vue -> /marketing

src/modules/auth/login/Registry.vue -> /auth/login
src/modules/auth/signup/Registry.vue -> /auth/signup

src/modules/products/Registry.vue -> /products
src/modules/products/[id]/Registry.vue -> /products/:id
src/modules/students/[id]/[name]/Registry.vue -> /students/:id/:name
```

## Route Groups

```
src/modules/(marketing)/about/Registry.vue -> /about
src/modules/(app)/dashboard/Registry.vue -> /dashboard
```

## Rest Parameters

```
src/modules/post/[...rest]/Registry.vue -> /post/:rest*
```

## Optional Parameters

```
src/modules/users/[[id]]/Registry.vue -> /users/:id?
```

## Matching

```
src/modules/archive/[page]/Registry.vue -> /archive/:page
src/modules/archive/[page=integer]/Registry.vue -> /archive/:page(\\d+)
src/modules/archive/[[page=integer]]/Registry.vue -> /archive/:page(\\d+)?
```
