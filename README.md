# Vue Starter

:poodle: A boilerplate for HTML5, Vue, Material, Babel, Flow, and PostCSS.

|    | Project Information |
|:--:|---------------------|
| Live Demo | [![Develop Demo][demo-develop-image]][demo-develop-link] [![Master Demo][demo-master-image]][demo-master-link] |
| Develop Branch | [![Build Status][develop-build-image]][develop-build-link] [![Coverage Status][develop-coverage-image]][develop-coverage-link] |
| Master Branch | [![Build Status][master-build-image]][master-build-link] [![Coverage Status][master-coverage-image]][master-coverage-link] |
| Npm Package | [![dependencies Status][package-dependencies-image]][package-dependencies-link] [![devDependencies Status][package-devDependencies-image]][package-devDependencies-link] |

[demo-develop-image]: https://img.shields.io/badge/link-develop-blue.svg
[demo-develop-link]: https://oh-my-vue-dev.netlify.com
[demo-master-image]: https://img.shields.io/badge/link-master-blue.svg
[demo-master-link]: https://oh-my-vue-prod.netlify.com

[develop-build-image]: https://img.shields.io/circleci/build/github/Shyam-Chen/Vue-Starter/develop
[develop-build-link]: https://circleci.com/gh/Shyam-Chen/workflows/Vue-Starter
[develop-coverage-image]: https://img.shields.io/codecov/c/github/Shyam-Chen/Vue-Starter/develop.svg
[develop-coverage-link]: https://codecov.io/gh/Shyam-Chen/Vue-Starter

[master-build-image]: https://img.shields.io/circleci/build/github/Shyam-Chen/Vue-Starter/master
[master-build-link]: https://circleci.com/gh/Shyam-Chen/workflows/Vue-Starter
[master-coverage-image]: https://img.shields.io/codecov/c/github/Shyam-Chen/Vue-Starter/master.svg
[master-coverage-link]: https://codecov.io/gh/Shyam-Chen/Vue-Starter

[package-dependencies-image]: https://img.shields.io/david/Shyam-Chen/Vue-Starter.svg
[package-dependencies-link]: https://david-dm.org/Shyam-Chen/Vue-Starter
[package-devDependencies-image]: https://img.shields.io/david/dev/Shyam-Chen/Vue-Starter.svg
[package-devDependencies-link]: https://david-dm.org/Shyam-Chen/Vue-Starter?type=dev

## Table of Contents

* [Getting Started](#getting-started)
* [Key Features](#key-features)
* [Dockerization](#dockerization)
* [Configuration](#configuration)
* [Directory Structure](#directory-structure)

## Getting Started

Follow steps to execute this boilerplate.

1. Clone this boilerplate

```bash
$ git clone --depth 1 https://github.com/Shyam-Chen/Vue-Starter <PROJECT_NAME>
$ cd <PROJECT_NAME>
```

2. Install dependencies

```bash
$ yarn install && yarn typed
```

3. Start a local server

```bash
$ yarn serve
```

4. Compile and bundle code

```bash
$ yarn build
```

5. Check code quality

```bash
$ yarn lint
```

6. Runs unit tests

```bash
$ yarn unit
```

7. Runs end-to-end tests

```bash
$ yarn e2e
```

## Key Features

This seed repository provides the following features:

* ---------- **Essentials** ----------
* [x] [Vue](https://github.com/vuejs/vue)
* [x] [Vue Router](https://github.com/vuejs/vue-router)
* [x] [Vuex](https://github.com/vuejs/vuex)
* [x] [Vuetify](https://github.com/vuetifyjs/vuetify)
* [x] [Vue I18n](https://github.com/kazupon/vue-i18n)
* [x] [Axios](https://github.com/axios/axios)
* [x] [GraphQL Request](https://github.com/prisma/graphql-request)
* [x] [Vue Socket.IO](https://github.com/MetinSeylan/Vue-Socket.io)
* [x] [Vue Apollo](https://github.com/vuejs/vue-apollo)
* ---------- **Tools** ----------
* [x] [Webpack](https://github.com/webpack/webpack)
* [x] [Babel](https://github.com/babel/babel)
* [x] [Flow](https://github.com/facebook/flow)
* [x] [PostCSS](https://github.com/postcss/postcss)
* [x] [ESLint](https://github.com/eslint/eslint)
* [x] [StyleLint](https://github.com/stylelint/stylelint)
* [x] [Jest](https://github.com/facebook/jest)
* [x] [Puppeteer](https://github.com/GoogleChrome/puppeteer)
* [x] [Workbox](https://github.com/GoogleChrome/workbox)
* ---------- **Environments** ----------
* [x] [Node.js](https://nodejs.org/)
* [x] [Docker](https://www.docker.com/)
* [x] [CircleCI](https://circleci.com/)
* [x] [Codecov](https://codecov.io/)
* [x] [Sentry](https://sentry.io/welcome/)

## Dockerization

Dockerize an application.

1. Build and run the container in the background

```bash
$ docker-compose up -d <SERVICE>
```

2. Run a command in a running container

```bash
$ docker-compose exec <SERVICE> <COMMAND>
```

3. Remove the old container before creating the new one

```bash
$ docker-compose rm -fs
```

4. Restart up the container in the background

```bash
$ docker-compose up -d --build <SERVICE>
```

5. Push images to Docker Cloud

```diff
# .gitignore

  .DS_Store
  node_modules
  npm
  public
  functions
  coverage
+ dev.Dockerfile
+ stage.Dockerfile
+ prod.Dockerfile
  *.log
```

```bash
$ docker login
$ docker build -f ./tools/<dev|stage|prod>.Dockerfile -t <IMAGE_NAME>:<IMAGE_TAG> .

# checkout
$ docker images

$ docker tag <IMAGE_NAME>:<IMAGE_TAG> <DOCKER_ID_USER>/<IMAGE_NAME>:<IMAGE_TAG>
$ docker push <DOCKER_ID_USER>/<IMAGE_NAME>:<IMAGE_TAG>

# remove
$ docker rmi <REPOSITORY>:<TAG>
# or
$ docker rmi <IMAGE_ID>
```

6. Pull images from Docker Cloud

```diff
# docker-compose.yml

  <dev|stage|prod>:
-   image: <dev|stage|prod>
-   build:
-     context: .
-     dockerfile: ./tools/<dev|stage|prod>.Dockerfile
+   image: <DOCKER_ID_USER>/<IMAGE_NAME>:<IMAGE_TAG>
    volumes:
      - yarn:/home/node/.cache/yarn
    tty: true
```

## Configuration

### Project environments

Change to your project.

```js
// .firebaserc
{
  "projects": {
    "development": "<DEV_PROJECT_NAME>",
    "staging": "<STAGE_PROJECT_NAME>",
    "production": "<PROD_PROJECT_NAME>"
  }
}
```

Set an active project for working direct

```bash
$ yarn firebase use development
```

### Default environments

Set your local environment variables. (use `this.<ENV_NAME> = process.env.<ENV_NAME> || <LOCAL_ENV>;`)

```js
// env.js
function Environments() {
  this.NODE_ENV = process.env.NODE_ENV || 'development';

  this.HOST_NAME = process.env.HOST_NAME || '0.0.0.0';
  this.SITE_PORT = process.env.SITE_PORT || 8000;
  this.SITE_URL = process.env.SITE_URL || `http://${this.HOST_NAME}:${this.SITE_PORT}`;
  this.APP_BASE = process.env.APP_BASE || '/';

  this.GOOGLE_ANALYTICS = process.env.GOOGLE_ANALYTICS || '<GOOGLE_ANALYTICS>';
  this.SENTRY_DSN = process.env.SENTRY_DSN || null;
}
```

### Deployment environment

Set your deployment environment variables.

```dockerfile
# tools/<dev|stage|prod>.Dockerfile

# envs --
ENV PROJECT_NAME <PROJECT_NAME>
# ...
# -- envs
```

### CI environment

Add environment variables to the CircleCI build.

```yml
DOCKER_USERNAME
DOCKER_PASSWORD

CODECOV_TOKEN

FIREBASE_TOKEN
```

Generate an authentication token for `FIREBASE_TOKEN`.

```bash
$ yarn firebase login:ci
```

### SEO friendly

Enable billing on your Firebase Platform and Google Cloud the project by switching to the Blaze plan.

Deploy functions.

```bash
$ nvm use 8
$ cd functions && yarn install
$ yarn firebase deploy --only functions
```

Serve dynamic content for bots.

```diff
// firebase.json
    "rewrites": [
      {
        "source": "**",
-       "destination": "/index.html"
+       "function": "app"
      }
    ],
```

Deploy rendertron instance to Google App Engine.

```bash
$ git clone https://github.com/GoogleChrome/rendertron
$ cd rendertron
$ gcloud auth login
$ gcloud app deploy app.yaml --project <RENDERTRON_NAME>
```

Set your rendertron instance in deployment environment.

```bash
$ yarn firebase functions:config:set RENDERTRON_URL="<RENDERTRON_URL>" SITE_URL="<SITE_URL>"

# Example:
# RENDERTRON_URL=https://<APP_NAME>.appspot.com
# SITE_URL=https://<APP_NAME>.web.app
```

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
│   │   │   ├── getters.spec.js
│   │   │   └── mutations.spec.js
│   │   ├── _<THING>  -> feature of private or protected things
│   │   │   └── ...
│   │   ├── <FEATURE>.vue  -> page component
│   │   ├── actions.js
│   │   ├── constants.js
│   │   ├── getters.js
│   │   ├── mutations.js
│   │   └── types.js
│   ├── <GROUP>  -> module group
│   │   └── <FEATURE>  -> feature modules
│   │       ├── __tests__
│   │       │   ├── <FEATURE>.e2e-spec.js
│   │       │   ├── <FEATURE>.spec.js
│   │       │   ├── actions.spec.js
│   │       │   ├── getters.spec.js
│   │       │   └── mutations.spec.js
│   │       ├── _<THING>  -> feature of private or protected things
│   │       │   └── ...
│   │       ├── <FEATURE>.vue  -> page component
│   │       ├── actions.js
│   │       ├── constants.js
│   │       ├── getters.js
│   │       ├── mutations.js
│   │       └── types.js
│   ├── shared  -> shared feature module
│   │   └── ...
│   ├── App.vue
│   ├── actions.js
│   ├── constants.js
│   ├── getters.js
│   ├── index.html
│   ├── main.js
│   └── types.js
├── tools
│   └── ...
├── .babelrc
├── .editorconfig
├── .eslintrc
├── .flowconfig
├── .gitignore
├── .postcssrc
├── .stylelintrc
├── Dockerfile
├── LICENSE
├── README.md
├── circle.yml
├── docker-compose.yml
├── env.js
├── jest.config.js
├── package.json
├── webpack.config.js
└── yarn.lock
```
