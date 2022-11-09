# Vue Starter

:poodle: A boilerplate for HTML5, Vue, TypeScript, Vite, Vitest, and Render.

:rainbow: [Live Demo](https://vue-starter-6fa6.onrender.com) - The server application is [here](https://github.com/Shyam-Chen/Fastify-Starter).

## Table of Contents

- [Getting Started](#getting-started)
- [Project Setup](#project-setup)
- [Key Features](#key-features)
- [Configuration](#configuration)
- [Directory Structure](#directory-structure)
- [Microservices](#microservices)

## Getting Started

Get started with Vue Starter.

```sh
# dev server
$ pnpm install
$ pnpm dev

# mock server
$ cd mock/requests && pnpm install && cd ../..
$ pnpm mock
```

## Project Setup

Follow steps to execute this boilerplate.

### Install dependencies

```sh
$ pnpm install
```

### Compiles and hot-reloads for development

```sh
$ pnpm dev
```

### Compiles and minifies for production

```sh
$ pnpm build
```

### Lints and fixes files

Files: `src/**/*.{ts,vue}`

```sh
$ pnpm lint
```

### Runs unit tests

Files: `src/**/*.spec.ts`

```sh
$ pnpm unit
```

### Runs end-to-end tests

Files: `e2e/**/*.spec.ts`

```sh
# Before running the `e2e` command, make sure to run the following commands.
$ pnpm build
$ pnpm preview

# If it's not installed, run it.
$ cd e2e && pnpm install && cd ..

$ pnpm e2e
```

### Mock requests

```sh
# If it's not installed, run it.
$ cd mock/requests && pnpm install && cd ../..

$ pnpm mock
```

## Key Features

This seed repository provides the following features:

- ---------- **Essentials** ----------
- [x] [Vue](https://github.com/vuejs/vue)
- [x] [Router](https://github.com/vuejs/vue-router)
- [x] [Formor](https://github.com/Vanilla-IceCream/vue-formor)
- [x] [I18n](https://github.com/intlify/vue-i18n-next)
- [x] [Hooks](https://github.com/vueuse/vueuse)
- [x] [Lodash](https://github.com/lodash/lodash)
- [x] [Yup](https://github.com/jquense/yup)
- [x] [Date Fns](https://github.com/date-fns/date-fns)
- [x] [UnoCSS](https://github.com/unocss/unocss)
- [x] [Iconify](https://github.com/iconify/iconify)
- [x] [Highcharts](https://github.com/highcharts/highcharts)
- ---------- **Tools** ----------
- [x] [Vite](https://github.com/vitejs/vite)
- [x] [TypeScript](https://github.com/microsoft/TypeScript)
- [x] [Sassy CSS](https://github.com/sass/sass)
- [x] [ESLint](https://github.com/eslint/eslint)
- [x] [Prettier](https://github.com/prettier/prettier)
- [x] [Vitest](https://github.com/vitest-dev/vitest)
- [x] [Playwright](https://github.com/microsoft/playwright)
- ---------- **Environments** ----------
- [x] [Node.js](https://nodejs.org/en/)
- [x] [Pnpm](https://pnpm.io/)
- [x] [Caddy](https://caddyserver.com/)
- [x] [Docker](https://www.docker.com/)
- [x] [CircleCI](https://circleci.com/)
- [x] [Render](https://render.com/)
- ---------- **Extracts** ----------
- [x] [Web Components](https://github.com/Shyam-Chen/Component-Starter)
- [x] [WebAssembly](https://github.com/Shyam-Chen/Assembly-Starter)

## Configuration

Control the environment.

### Default environments

Set your local environment variables. (use `this.<ENV_NAME> = process.env.<ENV_NAME> || <LOCAL_ENV>;`)

```js
// env.ts
export default {
  API_URL: process.env.API_URL || '',
};
```

### Continuous integration environments

Add environment variables to the CircleCI build.

```sh
# production
API_URL=xxx
DEPLOY_HOOK=xxx

# development
DEV_API_URL=xxx
DEV_DEPLOY_HOOK=xxx

# staging
STAGE_API_URL=xxx
STAGE_DEPLOY_HOOK=xxx
```

## Directory Structure

The structure follows the LIFT Guidelines.

```coffee
.
├── .circleci
├── e2e -> e2e testing (Caddy Server serve static files and proxy mock api)
├── mock
│   ├── requests -> mock api
│   └── responses -> mock data for mock api, unit testing, and e2e testing
├── public
├── src
│   ├── assets -> data, fonts, images, medias, styles
│   ├── components -> shared module
│   ├── composables -> shared module
│   ├── layouts -> core module
│   ├── locales -> core module
│   ├── middleware -> core module
│   ├── modules -> feature modules
│   │   └── <FEATURE> -> feature module
│   │       ├── __tests__ -> unit testing
│   │       ├── _locales
│   │       ├── Consumer.vue
│   │       ├── Registry.vue -> page component
│   │       ├── schema.ts
│   │       ├── provider.ts
│   │       └── types.ts
│   ├── plugins -> root module
│   ├── utilities -> shared module
│   ├── App.vue
│   ├── Error.vue
│   ├── main.ts
│   └── shims.d.ts
├── .editorconfig
├── .eslintrc
├── .gitignore
├── .prettierrc
├── Caddyfile
├── docker-compose.yml
├── Dockerfile
├── env.ts
├── index.html -> entrypoint
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── README.md
├── render.yaml
├── tsconfig.json
└── vite.config.ts
```

## Microservices

> A micro-frontend architecture lays out the approach for the structural elements of a micro-frontend framework. It also defines the relationships among them, governing how UI fragments are assembled and communicate in order to achieve the optimal developer and user experience.

See [Micro-Fullstack's Micro Frontends](https://github.com/Shyam-Chen/Micro-Fullstack/tree/main/mfe) for instructions on how to create microservices from source code.
