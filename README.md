# Vue Starter

:poodle: A boilerplate for HTML5, Vue, TypeScript, Vite, Vitest, and Render.

:rainbow: [Live Demo](https://vue-starter-6fa6.onrender.com) - The server application is [here](https://github.com/Shyam-Chen/Fastify-Starter).

## Table of Contents

- [Getting Started](#getting-started)
- [Project Setup](#project-setup)
- [Key Features](#key-features)
- [Configuration](#configuration)
- [Directory Structure](#directory-structure)

## Getting Started

Prerequisites:

- Node.js v20
- PNPM v8

Get started with Vue Starter.

```sh
$ pnpm install

# dev server
$ pnpm dev

# mock server
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

### Mock APIs during development

```sh
$ pnpm mock
```

### Compiles and minifies for production

```sh
$ pnpm build
```

### Locally preview the production build

```sh
$ pnpm preview
```

### Lints and fixes files

```sh
$ pnpm lint
```

### Check types

```sh
$ pnpm check
```

### Runs unit tests

```sh
$ pnpm test
```

### Runs end-to-end tests

```sh
$ pnpm e2e
```

## Key Features

This seed repository provides the following features:

- ---------- **Essentials** ----------
- [x] [Vue](https://github.com/vuejs/vue) - User Interface Framework
- [x] [Router](https://github.com/vuejs/vue-router) - Routing
- [x] [Routes](https://github.com/Vanilla-IceCream/vite-plugin-vue-routes) - File-based Routing
- [x] [Storer](https://github.com/Vanilla-IceCream/vue-storer) - State Management
- [x] [Formor](https://github.com/Vanilla-IceCream/vue-formor) - Form Validation
- [x] [Valibot](https://github.com/fabian-hiller/valibot) - Schema Validation
- [x] [Localer](https://github.com/Vanilla-IceCream/vue-localer) - Internationalization and Localization
- [x] [Use](https://github.com/vueuse/vueuse) - Composition Utilities
- [x] [Qrcode Image](https://github.com/Vanilla-IceCream/vue-qrcode-image) - QR Code Generation
- [x] [Lodash](https://github.com/lodash/lodash) - JavaScript Utilities
- [x] [Date Fns](https://github.com/date-fns/date-fns) - Date Utilities
- [x] [UnoCSS](https://github.com/unocss/unocss) - CSS Utilities
- [x] [Iconify](https://github.com/iconify/iconify) - Icon Utilities
- [x] [Tiptap](https://github.com/ueberdosis/tiptap) - Rich Text Editor
- [x] [ECharts](https://github.com/apache/echarts) - Data Visualization
- ---------- **Tools** ----------
- [x] [Vite](https://github.com/vitejs/vite) - Bundler
- [x] [TypeScript](https://github.com/microsoft/TypeScript) - JavaScript with Syntax for Types
- [x] [Sassy CSS](https://github.com/sass/sass) - CSS Extension
- [x] [ESLint](https://github.com/eslint/eslint) - Linter
- [x] [Prettier](https://github.com/prettier/prettier) - Formatter
- [x] [Vitest](https://github.com/vitest-dev/vitest) - Test Runner
- [x] [Playwright](https://github.com/microsoft/playwright) - Test Automation
- ---------- **Environments** ----------
- [x] [Node.js](https://nodejs.org/en/) - JavaScript Runtime Environment
- [x] [Pnpm](https://pnpm.io/) - Package Manager
- [x] [Caddy](https://caddyserver.com/) - Web Server
- [x] [Docker](https://www.docker.com/) - Containerized Application Development
- [x] [GitHub Actions](https://github.com/features/actions) - Continuous Integration and Delivery
- [x] [Render](https://render.com/) - Cloud Application Hosting

## Configuration

Control the environment.

### Default environments

Set your local environment variables.

```ts
// vite.config.ts
  define: envify({
    API_URL: process.env.API_URL || '',
  }),
```

### Continuous integration environments

Add environment secrets to the GitHub Actions workflow.

```sh
DEPLOY_HOOK=xxx
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
├── .github/workflows/ci.yml
├── e2e
├── mock
├── public
├── src
│   ├── assets
│   ├── components
│   ├── composables
│   ├── layouts
│   ├── locales
│   ├── middleware
│   ├── plugins
│   ├── routes
│   ├── utilities
│   ├── App.vue
│   ├── main.ts
│   └── shims.d.ts
├── ui
├── .editorconfig
├── .eslintrc
├── .gitignore
├── .prettierrc
├── Caddyfile
├── docker-compose.yml
├── Dockerfile
├── index.html
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── render.yaml
├── tsconfig.json
└── vite.config.ts
```
