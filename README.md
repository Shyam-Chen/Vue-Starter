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

5. Push images to Docker Cloud

```bash
$ docker login
$ docker build -f tools/Dockerfile.<dev|prod> -t <IMAGE_NAME>:<IMAGE_TAG> .

# checkout
$ docker images

$ docker tag <IMAGE_NAME>:<IMAGE_TAG> <DOCKER_ID_USER>/<IMAGE_NAME>:<IMAGE_TAG>
$ docker push <DOCKER_ID_USER>/<IMAGE_NAME>:<IMAGE_TAG>

# remove
$ docker rmi <IMAGE_ID>
```

6. Pull images from Docker Cloud

```diff
# docker-compose.yml

  <dev|prod>:
-   image: <dev|prod>
-   build:
-     context: .
-     dockerfile: tools/Dockerfile.<dev|prod>
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
    "development": "<PROJECT_NAME>",
    "production": "<PROJECT_NAME>"
  }
}
```

### Default environments

Set your local environment variables. (use `this.<ENV_NAME> = process.env.<ENV_NAME> || <LOCAL_ENV>;`)

```js
// env.js
function Environments() {
  this.NODE_ENV = process.env.NODE_ENV || 'development';

  this.PROJECT_NAME = process.env.PROJECT_NAME || '<PROJECT_NAME>';

  this.SITE_PORT = process.env.SITE_PORT || 8000;
  this.SITE_URL = process.env.SITE_URL || `http://localhost:${this.SITE_PORT}`;

  this.FUNC_PORT = process.env.FUNC_PORT || 5000;
  this.FUNC_URL = process.env.FUNC_URL || `http://localhost:${this.FUNC_PORT}/${this.PROJECT_NAME}/us-central1`;

  this.GOOGLE_ANALYTICS = process.env.GOOGLE_ANALYTICS || '<GOOGLE_ANALYTICS>';

  this.SENTRY_DSN = process.env.SENTRY_DSN || null;
}
```

### Deploy environments

Set your deploy environment variables.

```dockerfile
# tools/Dockerfile.<dev|prod>

# envs --
ENV SITE_URL <SITE_URL>
ENV FUNC_URL <FUNC_URL>

ENV SENTRY_DSN <SENTRY_DSN>
# -- envs
```

### SEO friendly

Enable billing on your Firebase Platform and Google Cloud the project by switching to the Blaze plan.

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

```coffee
.
├── src
│   ├── api
│   │   ├── config  -> config middlewares
│   │   ├── graphql
│   │   │   └── <FEATURE>
│   │   │       ├── __tests__
│   │   │       │   └── ...
│   │   │       └── ...
│   │   ├── <FEATURE>
│   │   │   ├── __tests__
│   │   │   │   └── ...
│   │   │   └── ...
│   │   └── index.js
│   ├── app
│   │   ├── _languages  -> app languages
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
│   │   │   ├── _languages  -> <FEATURE> languages
│   │   │   │   └── ...
│   │   │   ├── actions.js
│   │   │   ├── constants.js
│   │   │   ├── <FEATURE>.vue
│   │   │   ├── getters.js
│   │   │   ├── mutations.js
│   │   │   └── types.js
│   │   ├── actions.js  -> root actions
│   │   ├── App.vue  -> app root
│   │   ├── constants.js  -> root constants
│   │   ├── getters.js  -> root getters
│   │   ├── mutations.js  -> root mutations
│   │   └── types.js  -> root types
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
