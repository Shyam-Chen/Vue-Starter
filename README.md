# Vue Fullstack Starter

:poodle: A boilerplate for Vue, Material, Express, Babel, Flow, and ReactiveX.

[![Build Status](https://img.shields.io/circleci/project/Shyam-Chen/Vue-Fullstack-Starter/develop.svg)](https://circleci.com/gh/Shyam-Chen/workflows/Vue-Fullstack-Starter)
[![Coverage Status](https://img.shields.io/codecov/c/github/Shyam-Chen/Vue-Fullstack-Starter/develop.svg)](https://codecov.io/gh/Shyam-Chen/Vue-Fullstack-Starter)
 //
[![dependencies Status](https://david-dm.org/Shyam-Chen/Vue-Fullstack-Starter/status.svg)](https://david-dm.org/Shyam-Chen/Vue-Fullstack-Starter)
[![devDependencies Status](https://david-dm.org/Shyam-Chen/Vue-Fullstack-Starter/dev-status.svg)](https://david-dm.org/Shyam-Chen/Vue-Fullstack-Starter?type=dev)

:rainbow: Live Demo: [Dev Mode](https://vue-by-example-dev.firebaseapp.com/) | [Prod Mode](https://vue-by-example-prod.firebaseapp.com/)

## Table of Contents

* [Getting Started](#getting-started)
* [Project Template](#project-template)
* [Dockerization](#dockerization)
* [Configuration](#configuration)
* [Directory Structure](#directory-structure)

## Getting Started

Follow steps to execute this boilerplate.

1. Clone this Boilerplate

```bash
$ git clone --depth 1 https://github.com/Shyam-Chen/Vue-Fullstack-Starter <PROJECT_NAME>
$ cd <PROJECT_NAME>
```

2. Install Dependencies

```bash
$ yarn install

# install flow types
$ yarn typed
```

3. Run the code

```bash
# front-end
$ yarn start:app

# back-end
$ yarn start:api
```

4. Build the code

```bash
# front-end
$ yarn build:app

# back-end
$ yarn build:api
```

5. Check the code

```bash
# scripts
$ yarn lint:js

# styles
$ yarn lint:css
```

6. Run the test

```bash
# front-end
$ yarn test:app

# back-end
$ yarn test:api
```

7. Run the e2e

```bash
# ui
$ yarn e2e:app

# http
$ yarn e2e:api
```

## Project Template

Generate a blank project via Vue CLI.

1. Install Vue CLI

```bash
$ yarn global add vue-cli
```

2. Create a project

```bash
$ vue init Shyam-Chen/Vue-Fullstack-Template <PROJECT_NAME>
```

3. Start your journey

```bash
$ cd <PROJECT_NAME>
$ yarn install && yarn typed
$ yarn start:app
$ yarn start:api
```

:vertical_traffic_light: Project template repository can be accessed from [here](https://github.com/Shyam-Chen/Vue-Fullstack-Template).

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

## Configuration

### Project environments

Change to your projects.

```js
// .firebaserc
{
  "projects": {
    "development": "<PROJECT_NAME>",
    "production": "<PROJECT_NAME>"
  }
}
```

### Default environments

Set your local environment variables.

```js
// env.js
const NODE_ENV = exports.NODE_ENV = process.env.NODE_ENV || 'development';

const PROJECT_NAME = exports.PROJECT_NAME = process.env.PROJECT_NAME || '<PROJECT_NAME>';

const SITE_PORT = exports.SITE_PORT = process.env.SITE_PORT || 8000;
const SITE_URL = exports.SITE_URL = process.env.SITE_URL || `http://localhost:${SITE_PORT}`;

const FUNC_PORT = exports.FUNC_PORT = process.env.FUNC_PORT || 5000;
const FUNC_URL = exports.FUNC_URL = process.env.FUNC_URL || `http://localhost:${FUNC_PORT}/${PROJECT_NAME}/us-central1`;

const SENTRY_DSN = exports.SENTRY_DSN = process.env.SENTRY_DSN || null;
```

### Deploy environments

Set your deploy environment variables.

```dockerfile
# tools/Dockerfile.<dev|prod>

# envs --
ENV SITE_URL https://vue-by-example-prod.firebaseapp.com
ENV FUNC_URL https://us-central1-vue-by-example-prod.cloudfunctions.net

ENV SENTRY_DSN https://cea15151a5984c6e80937903b07ae124@sentry.io/1192108
# -- envs
```

### Enable SEO

Enable Billing on your Firebase and Google Cloud Platform the project by switching to the Blaze plan.

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
$ gcloud app deploy app.yaml --project <PROJECT_NAME>
```

### VS Code settings

```js
{
  "window.zoomLevel": 1,
  "workbench.colorTheme": "Material Theme",
  "workbench.iconTheme": "material-icon-theme",
  "eslint.validate": [
    "javascript", {
      "language": "vue"
    },
    "javascriptreact",
    "html"
  ],
  "javascript.validate.enable": false,
  "vetur.validation.script": false
}
```

## Directory Structure

```js
.
├── src
│   ├── api
│   │   ├── <FEATURE>
│   │   │   ├── __tests__
│   │   │   │   └── ...
│   │   │   └── ...
│   │   └── index.js
│   ├── app
│   │   ├── _languages
│   │   │   └── ...
│   │   ├── config  -> config plugins
│   │   │   └── ...
│   │   ├── <FEATURE>
│   │   │   ├── __tests__
│   │   │   │   ├── actions.spec.js
│   │   │   │   ├── <FEATURE>.e2e-spec.js
│   │   │   │   ├── <FEATURE>.spec.js
│   │   │   │   ├── getters.spec.js
│   │   │   │   └── mutations.spec.js
│   │   │   ├── _languages
│   │   │   │   └── ...
│   │   │   ├── actions.js
│   │   │   ├── constants.js
│   │   │   ├── <FEATURE>.vue
│   │   │   ├── getters.js
│   │   │   ├── mutations.js
│   │   │   └── types.js
│   │   ├── shared  -> shared components
│   │   │   └── ...
│   │   ├── actions.js  -> root actions
│   │   ├── App.vue
│   │   ├── constants.js
│   │   ├── getters.js  -> root getters
│   │   ├── mutations.js  -> root mutations
│   │   └── types.js
│   ├── assets  -> datas, fonts, images, medias, styles
│   ├── client.js
│   ├── index.html
│   └── server.js
├── tools
│   └── ...
├── .babelrc
├── .editorconfig
├── .eslintrc
├── .firebaserc
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
├── firebase.json
├── gulpfile.js
├── jest.config.js
├── package.json
├── webpack.config.js
└── yarn.lock
```
