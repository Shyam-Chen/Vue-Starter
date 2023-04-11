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
- [x] [Vue](https://github.com/vuejs/vue) - User Interface Framework
- [x] [Router](https://github.com/vuejs/vue-router) - Routing
- [x] [Storer](https://github.com/Vanilla-IceCream/vue-storer) - State Management
- [x] [Formor](https://github.com/Vanilla-IceCream/vue-formor) - Form Validation
- [x] [Localer](https://github.com/Vanilla-IceCream/vue-localer) - Internationalization and Localization
- [x] [Hooks](https://github.com/vueuse/vueuse) - Composition Utilities
- [x] [Lodash](https://github.com/lodash/lodash) - JavaScript Utilities
- [x] [Zod](https://github.com/colinhacks/zod) - Schema Validation
- [x] [Date Fns](https://github.com/date-fns/date-fns) - Date Utilities
- [x] [UnoCSS](https://github.com/unocss/unocss) - CSS Utilities
- [x] [Iconify](https://github.com/iconify/iconify) - Icon Utilities
- [x] [Highcharts](https://github.com/highcharts/highcharts) - Data Visualization
- [x] [Qrcode Image](https://github.com/Vanilla-IceCream/vue-qrcode-image) - QR Code Generation
- ---------- **Tools** ----------
- [x] [Vite](https://github.com/vitejs/vite) - Bundler
- [x] [TypeScript](https://github.com/microsoft/TypeScript) - JavaScript with Syntax for Types
- [x] [Sassy CSS](https://github.com/sass/sass) - CSS Extension
- [x] [ESLint](https://github.com/eslint/eslint) - Linter
- [x] [Prettier](https://github.com/prettier/prettier) - Formatter
- [x] [Vitest](https://github.com/vitest-dev/vitest) - Test Runner
- [x] [Playwright](https://github.com/microsoft/playwright) - Test Automation
- [x] [Lighthouse](https://github.com/GoogleChrome/lighthouse) - Measure Performance
- [x] [VitePress](https://github.com/vuejs/vitepress) - Documentation
- ---------- **Environments** ----------
- [x] [Node.js](https://nodejs.org/en/) - JavaScript Runtime Environment
- [x] [Pnpm](https://pnpm.io/) - Package Manager
- [x] [Caddy](https://caddyserver.com/) - Web Server
- [x] [Docker](https://www.docker.com/) - Containerized Application Development
- [x] [CircleCI](https://circleci.com/) - Continuous Integration and Delivery
- [x] [Render](https://render.com/) - Cloud Application Hosting

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
DEPLOY_HOOK=xxx

# development
DEV_DEPLOY_HOOK=xxx

# staging
STAGE_DEPLOY_HOOK=xxx
```

### Continuous delivery environments

Add environment variables to the Render build.

```sh
API_URL=xxx
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

See [Micro-Fullstack's Micro Frontends](https://github.com/Shyam-Chen/Micro-Fullstack/tree/main/micro-vite) for instructions on how to create microservices from source code.

```coffee
example.com
├── feature1.example.com
└── feature2.example.com
```
