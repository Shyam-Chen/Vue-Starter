# Modules Directory

Defines a folder-based routing to create routes with Domain-driven Design.

## Routing

```coffee
src/modules/marketing/Registry.vue -> /marketing

src/modules/auth/login/Registry.vue -> /auth/login
src/modules/auth/signup/Registry.vue -> /auth/signup

src/modules/products/Registry.vue -> /products
src/modules/products/[id]/Registry.vue -> /products/:id
src/modules/students/[id]/[name]/Registry.vue -> /students/:id/:name
```

## Route Groups

```coffee
src/modules/(marketing)/about/Registry.vue -> /about
src/modules/(app)/dashboard/Registry.vue -> /dashboard
```

## Rest Parameters

```coffee
src/modules/post/[...rest]/Registry.vue -> /post/:rest\*
```

## Optional Parameters

```coffee
src/modules/users/[[id]]/Registry.vue -> /users/:id?
```

## Matching

```coffee
src/modules/archive/[page=integer]/Registry.vue -> /archive/:page(\\d+)?
```
