# Vue Starter

:poodle: A boilerplate for HTML5, Vue, Vue Router, UnoCSS, Vite, Vitest, and Netlify.

## Table of Contents

- [Project Setup](#project-setup)
- [Key Features](#key-features)
- [Dockerization](#dockerization)
- [Configuration](#configuration)
- [Examples](#examples)
- [Directory Structure](#directory-structure)
- [Microservices](#microservices)

## Project Setup

Follow steps to execute this boilerplate.

### Install dependencies

```sh
$ pnpm install
```

### Compiles and hot-reloads for development

```sh
$ pnpm serve
```

### Compiles and minifies for production

```sh
$ pnpm build
```

### Lints and fixes files

Files: `src/**/*.{js,vue}`

```sh
$ pnpm lint
```

### Runs unit tests

Files: `src/**/*.spec.js`

```sh
$ pnpm unit
```

### Runs end-to-end tests

Files: `e2e/**/*.spec.js`

```sh
# Before running the `e2e` command, make sure to run the following commands.
$ pnpm build
$ pnpm preview

# If it's not setup, run it.
$ pnpm setup

$ pnpm e2e
```

### Measures site's URLs

Files: `e2e/**/*.meas.js`

```sh
# Before running the `meas` command, make sure to run the following commands.
$ pnpm build
$ pnpm preview

# If it's not setup, run it.
$ pnpm setup

$ pnpm meas
```

### Mock requests

[`mock/requests`](./mock/requests) is a fork of [Fastify-Starter](https://github.com/Shyam-Chen/Fastify-Starter) that was made easy and quick way to run mock APIs locally.

```sh
# If it's not active, run it.
$ pnpm active

$ pnpm mock
```

## Key Features

This seed repository provides the following features:

- ---------- **Essentials** ----------
- [x] [Vue](https://github.com/vuejs/vue)
- [x] [Vue Router](https://github.com/vuejs/vue-router)
- [x] [Vue Localer](https://github.com/Vanilla-IceCream/vue-localer) - Internationalization
- [x] [Vue Formor](https://github.com/Vanilla-IceCream/vue-formor) - Form Validation
- ---------- **Tools** ----------
- [x] [Vite](https://github.com/vitejs/vite)
- [ ] [TypeScript](https://github.com/microsoft/TypeScript)
- [x] [UnoCSS](https://github.com/unocss/unocss)
- [x] [Iconify](https://github.com/iconify/iconify)
- [ ] [Workbox](https://github.com/GoogleChrome/workbox)
- [x] [ESLint](https://github.com/eslint/eslint)
- [x] [Prettier](https://github.com/prettier/prettier)
- [x] [Vitest](https://github.com/vitest-dev/vitest)
- [ ] [Playwright](https://github.com/microsoft/playwright)
- [ ] [Lighthouse](https://github.com/GoogleChrome/lighthouse)
- ---------- **Environments** ----------
- [x] [Node.js](https://nodejs.org/en/)
- [x] [Pnpm](https://pnpm.io/)
- [x] [Caddy](https://caddyserver.com/)
- [ ] [Netlify](https://www.netlify.com/)

## Dockerization

Dockerize an application.

1. Build and run the container in the background

```bash
$ docker-compose up -d default
```

2. Run a command in a running container

```bash
$ docker-compose exec default <COMMAND>
```

3. Remove the old container before creating the new one

```bash
$ docker-compose rm -fs
```

4. Restart up the container in the background

```bash
$ docker-compose up -d --build default
```

## Configuration

Control the environment.

### Default environments

Set your local environment variables. (use `this.<ENV_NAME> = process.env.<ENV_NAME> || <LOCAL_ENV>;`)

```js
// env.js

function Environment() {
  this.API_URL = process.env.API_URL ?? 'http://localhost:3000';
}

export default new Environment();
```

### Continuous integration environments

Add environment variables to the CircleCI build.

```sh
CODECOV_TOKEN=xxx
```

### Continuous deployment environments

Add environment variables to the Netlify build.

```sh
API_URL=http://api.example.com
```

### File-based environments

If you want to set environment variables from a file.

```coffee
.
├── e2e
├── envs
│   ├── dev.js
│   ├── stage.js
│   └── prod.js
├── mock
├── public
└── src
```

```js
// envs/<ENV_NAME>.js

function Environment() {
  this.API_URL = 'http://api.example.com';
}

module.exports = new Environment();
```

```sh
$ pnpm add env-cmd -D
```

```js
// package.json

  "scripts": {
    // "env-cmd -f ./envs/<ENV_NAME>.js" + "pnpm build"
    "build:dev": "env-cmd -f ./envs/dev.js pnpm build",
    "build:stage": "env-cmd -f ./envs/stage.js pnpm build",
    "build:prod": "env-cmd -f ./envs/prod.js pnpm build",
  },
```

### SEO friendly

Netlify comes with built-in prerendering. Enabling it is as simple as checking a box:

![Set up prerendering](https://d33wubrfki0l68.cloudfront.net/2fd9826f3d685da11e934f5032fa306ae094113b/6bf3c/images/site-deploys-prerendering.png)

### VS Code settings

The most basic configuration.

```js
{
  // ...
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue"
  ],
  "javascript.validate.enable": false,
  "css.validate": false,
  "vetur.validation.template": false,
  "vetur.validation.script": false,
  "vetur.validation.style": false,
  // ...
}
```

## Examples

- [Hello World](./src/hello-world)
- CRUD Operations
- Authentication
- File Uploads
- Realtime Data

## Directory Structure

The structure follows the LIFT Guidelines.

```coffee
.
├── src
│   ├── __tests__
│   │   └── ...
│   ├── _<THING>  -> app of private or protected things
│   │   └── ...
│   ├── assets  -> datas, fonts, images, medias, styles
│   │   └── ...
│   ├── core  -> core feature module
│   │   └── ...
│   ├── <FEATURE>  -> feature modules
│   │   ├── __tests__
│   │   │   ├── <FEATURE>.spec.js
│   │   │   ├── actions.spec.js
│   │   │   └── getters.spec.js
│   │   ├── _<THING>  -> feature of private or protected things
│   │   │   └── ...
│   │   ├── <FEATURE>.vue  -> page component
│   │   ├── actions.js
│   │   ├── constants.js
│   │   └── getters.js
│   ├── <GROUP>  -> module group
│   │   └── <FEATURE>  -> feature modules
│   │       ├── __tests__
│   │       │   ├── <FEATURE>.spec.js
│   │       │   ├── actions.spec.js
│   │       │   └── getters.spec.js
│   │       ├── _<THING>  -> feature of private or protected things
│   │       │   └── ...
│   │       ├── <FEATURE>.vue  -> page component
│   │       ├── actions.js
│   │       ├── constants.js
│   │       └── getters.js
│   ├── shared  -> shared feature module
│   │   └── ...
│   ├── App.vue
│   ├── Home.vue
│   └── main.js  -> entrypoint
├── .editorconfig
├── .eslintrc
├── .gitignore
├── .prettierrc
├── Caddyfile
├── circle.yml
├── docker-compose.yml
├── Dockerfile
├── env.js
├── index.html
├── jest.config.js
├── LICENSE
├── netlify.toml
├── package.json
├── README.md
└── vite.config.js
```

## Microservices

> Techniques, strategies and recipes for building a **modern web app** with **multiple teams** that can **ship features independently**.

See [Micro-Fullstack's Micro Frontends](https://github.com/Shyam-Chen/Micro-Fullstack/tree/main/mfe) for instructions on how to create microservices from source code.
