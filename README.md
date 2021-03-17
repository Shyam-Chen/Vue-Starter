# Vue Starter

:poodle: A boilerplate for HTML5, Vue, Vue Router, i18n, Tailwind, Windi, Netlify, and Vite.

## Table of Contents

- [Getting Started](#getting-started)
- [Key Features](#key-features)
- [Dockerization](#dockerization)
- [Configuration](#configuration)
- [Directory Structure](#directory-structure)
- [Microservices](#microservices)
- [Frequently Asked Questions](#frequently-asked-questions)

## Getting Started

Follow steps to execute this boilerplate.

1. Clone this boilerplate

```sh
$ git clone --depth 1 https://github.com/Shyam-Chen/Vue-Starter <PROJECT_NAME>
$ cd <PROJECT_NAME>
```

2. Install dependencies

```sh
$ yarn install
```

3. Compiles and hot-reloads for development

```sh
$ yarn serve
```

4. Compiles and minifies for production

```sh
$ yarn build
```

5. Lints and fixes files

File Scope: `src/**/*.{vue,js,css}`

```sh
$ yarn lint
```

6. Runs unit tests

File Scope: `src/**/*.spec.js`

```sh
$ yarn unit
```

7. Runs end-to-end tests

File Scope: `src/**/*.e2e-spec.js`

```sh
$ yarn build
$ yarn preview
$ yarn e2e
```

8. Measure app performance

File Scope: `src/**/*.e2e-meas.js`

```sh
$ yarn build
$ yarn preview
$ yarn meas
```

9. Mock requests

[`mock/requests`](./mock/requests) is a fork of [Koa-Starter](https://github.com/Shyam-Chen/Koa-Starter) that was made easy and quick way to run mock APIs locally.

```sh
$ yarn prepare
$ yarn mock
```

## Key Features

This seed repository provides the following features:

- ---------- **Essentials** ----------
- [x] [Vue](https://github.com/vuejs/vue)
- [x] [Vue Router](https://github.com/vuejs/vue-router)
- [x] [Vue Localer](https://github.com/Vanilla-IceCream/vue-localer)
- ---------- **Tools** ----------
- [x] [Vite](https://github.com/vitejs/vite)
- [x] [Windi CSS](https://github.com/windicss/windicss)
- ---------- **Environments** ----------
- [x] [Netlify](https://www.netlify.com/)
- [ ] [Capacitor](https://capacitorjs.com/) (`git merge capacitor --squash`)
- [ ] [Electron](https://www.electronjs.org/) (`git merge electron --squash`)

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

function Environments() {
  this.NODE_ENV = process.env.NODE_ENV || 'development';

  this.APP_NAME = process.env.APP_NAME || 'Oh My Vue';
  this.APP_DESCRIPTION =
    process.env.APP_DESCRIPTION ||
    'Starter templates for building full-featured Progressive Web Apps from Vue components.';

  this.HOST_NAME = process.env.HOST_NAME || '0.0.0.0';
  this.SITE_PORT = process.env.SITE_PORT || 8000;
  this.SITE_URL = process.env.SITE_URL || `http://${this.HOST_NAME}:${this.SITE_PORT}`;
  this.APP_BASE = process.env.APP_BASE || '/';

  this.API_URL = process.env.API_URL || `http://${this.HOST_NAME}:3000`;

  this.GOOGLE_ANALYTICS = process.env.GOOGLE_ANALYTICS || 'UA-XXXXXXXX-X';
  this.SENTRY_DSN = process.env.SENTRY_DSN || null;
}

export default new Environments();
```

### Continuous integration environments

Add environment variables to the CircleCI build.

```sh
CODECOV_TOKEN=xxx
```

### Continuous deployment environments

Add environment variables to the Netlify build.

```sh
# required
NODE_ENV=production
NODE_VERSION=14
NPM_CONFIG_PRODUCTION=false

# your environments
GOOGLE_ANALYTICS=xxx
SENTRY_DSN=xxx
...
```

### File-based environments

If you want to set environment variables from a file.

```coffee
.
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

function Environments() {
  this.NODE_ENV = 'production';

  this.APP_NAME = '...';
  this.APP_DESCRIPTION = '...';
  this.APP_BASE = '/';

  this.API_URL = 'https://api.example.com';

  this.GOOGLE_ANALYTICS = 'UA-XXXXXXXX-X';
  this.SENTRY_DSN = 'https://public@sentry.example.com/1';
}

module.exports = new Environments();
```

```sh
$ yarn add env-cmd -D
```

```js
// package.json

  "scripts": {
    // "env-cmd -f ./envs/<ENV_NAME>.js" + "yarn build"
    "build:dev": "env-cmd -f ./envs/dev.js yarn build",
    "build:stage": "env-cmd -f ./envs/stage.js yarn build",
    "build:prod": "env-cmd -f ./envs/prod.js yarn build",
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
│   │   │   ├── <FEATURE>.e2e-spec.js
│   │   │   ├── <FEATURE>.spec.js
│   │   │   ├── actions.spec.js
│   │   │   └── getters.spec.js
│   │   ├── _<THING>  -> feature of private or protected things
│   │   │   └── ...
│   │   ├── <FEATURE>.vue  -> page component
│   │   ├── actions.js
│   │   ├── constants.js
│   │   ├── getters.js
│   │   └── types.js
│   ├── <GROUP>  -> module group
│   │   └── <FEATURE>  -> feature modules
│   │       ├── __tests__
│   │       │   ├── <FEATURE>.e2e-spec.js
│   │       │   ├── <FEATURE>.spec.js
│   │       │   ├── actions.spec.js
│   │       │   └── getters.spec.js
│   │       ├── _<THING>  -> feature of private or protected things
│   │       │   └── ...
│   │       ├── <FEATURE>.vue  -> page component
│   │       ├── actions.js
│   │       ├── constants.js
│   │       ├── getters.js
│   │       └── types.js
│   ├── shared  -> shared feature module
│   │   └── ...
│   ├── actions.js
│   ├── App.vue
│   ├── constants.js
│   ├── e2e.js  -> e2e setup test
│   ├── getters.js
│   ├── index.html
│   ├── main.js  -> entrypoint
│   ├── types.js
│   └── unit.js  -> unit setup test
├── .editorconfig
├── .eslintrc
├── .flowconfig
├── .gitignore
├── .prettierrc
├── .stylelintrc
├── babel.config.js
├── circle.yml
├── docker-compose.yml
├── Dockerfile
├── env.js
├── jest.config.js
├── LICENSE
├── netlify.toml
├── package.json
├── postcss.config.js
├── README.md
├── webpack.config.js
└── yarn.lock
```

## Microservices

> Techniques, strategies and recipes for building a **modern web app** with **multiple teams** that can **ship features independently**.

See [Client-side Micro-Fullstack](https://github.com/Shyam-Chen/Micro-Fullstack/tree/master/client) for instructions on how to create microservices from source.

## Frequently Asked Questions

- HTML img src tag not displaying image

```vue
<template>
  <div>
    <img src="~~/assets/images/foo.png" alt="foo" />
  </div>
</template>
```

- CSS background image not displaying

```vue
<template>
  <div>
    <div class="foo"></div>
  </div>
</template>

<style scoped>
.foo {
  width: 6rem;
  height: 6rem;
  background: url('~/assets/images/foo.png') no-repeat;
}
</style>
```

- Vue.js dynamic images not displaying

```vue
<template>
  <div>
    <img :src="require('~/assets/images/foo.png')" alt="foo" />
  </div>
</template>
```
