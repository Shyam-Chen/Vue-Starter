# Vue Fullstack Starter

:poodle: A boilerplate for Vue, Material, Express, Babel, Flow, and ReactiveX.

[![Build Status](https://img.shields.io/circleci/project/Shyam-Chen/Vue-Fullstack-Starter/develop.svg)](https://circleci.com/gh/Shyam-Chen/Vue-Fullstack-Starter)
[![Coverage Status](https://img.shields.io/codecov/c/github/Shyam-Chen/Vue-Fullstack-Starter/develop.svg)](https://codecov.io/gh/Shyam-Chen/Vue-Fullstack-Starter)
 //
[![dependencies Status](https://david-dm.org/Shyam-Chen/Vue-Fullstack-Starter/status.svg)](https://david-dm.org/Shyam-Chen/Vue-Fullstack-Starter)
[![devDependencies Status](https://david-dm.org/Shyam-Chen/Vue-Fullstack-Starter/dev-status.svg)](https://david-dm.org/Shyam-Chen/Vue-Fullstack-Starter?type=dev)

[Live Demo (Dev)](https://vue-by-example-dev.firebaseapp.com/) | [Live Demo (Prod)](https://vue-by-example-prod.firebaseapp.com/)

## Table of Contents

* [Getting Started](#getting-started)
* [Project Template](#project-template)
* [Practical Examples](#practical-examples)
* [Dockerization](#dockerization)
* [Configuration](#configuration)
* [Directory Structure](#directory-structure)

## Getting Started

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
$ firebase serve --only functions
```

4. Build the code

```bash
# front-end
$ yarn build:app

# back-end
$ yarn build:api
```

5. Run the test

```bash
# front-end
$ yarn test:app

# back-end
$ yarn test:api
```

6. Run the e2e

```bash
# front-end
$ yarn e2e:app

# back-end
$ yarn e2e:api
```

## Project Template

Generate a blank project via Vue CLI

1. Install Vue CLI

```bash
$ yarn global add vue-cli
```

2. Create your project

```bash
$ vue init Shyam-Chen/Vue-Fullstack-Template <PROJECT_NAME>
```

## Practical Examples

* [ ] CRUD Operations
  * [x] Basic
  * [x] REST (`axios`)
  * [ ] GraphQL (`vue-apollo`)
* [ ] Form Controls
  * [x] Template-driven
  * [ ] Reactive (`rxjs`)
* [ ] Data Table
  * [ ] Basic
  * [ ] REST (`axios`)
  * [ ] GraphQL (`vue-apollo`)
* [ ] Globalization
  * [x] Internationalization (`vue-i18n`)
  * [ ] Localization
* [ ] Authorization
  * [ ] REST (`axios`)
  * [ ] GraphQL (`vue-apollo`)
* [ ] Data Visualization
  * [ ] Chart (`vue-chartjs`)
  * [ ] Map
* [ ] Realtime
  * [ ] Socket.IO (`socket.io`)
  * [ ] GraphQL Subscriptions (`graphql-subscriptions`)
* [ ] Playground
  * [x] Counter
    * [x] State Management (`vuex`)
    * [x] Asynchronous (`rxjs`)
  * [ ] Stepper
  * [ ] Calendar
  * [ ] Media
  * [ ] QR Code

## Dockerization

1. Build and run the Container in the background

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

## Configuration

### Project environments

Change to your projects.

```js
// .firebaserc
{
  "projects": {
    "development": "vue-by-example",
    "production": "vue-by-example"
  }
}
```

### Default environments

Set your local env variables.

```js
// env.js
const NODE_ENV = process.env.NODE_ENV || 'development';

const SITE_PORT = process.env.SITE_PORT || '8000';
const SITE_URL = process.env.SITE_URL || `http://localhost:${SITE_PORT}`;

const FUNC_PROJECT = process.env.FUNC_PROJECT || 'vue-by-example';
const FUNC_URL = process.env.FUNC_URL || `http://localhost:5000/${FUNC_PROJECT}/us-central1`;

/* eslint-disable object-property-newline */
module.exports = {
  NODE_ENV,
  SITE_PORT, SITE_URL,
  FUNC_PROJECT, FUNC_URL,
};
```

### Deploy environments

Create your `Dockerfile.dev` or `Dockerfile.prod` env image.

```dockerfile
[...]
# envs --
ENV SITE_URL https://vue-by-example.firebaseapp.com

ENV FUNC_URL https://us-central1-vue-by-example.cloudfunctions.net
# -- envs
[...]
```

Don't add `Docker.<dev|prod>` in version control.

So you need to push private images to Docker Hub.

```bash
$ docker login
$ docker push DOCKER_ID_USER/IMAGE_NAME
```

After having a private image, you need to login to Docker Hub at `circle.yml`.

```sh
docker login -u ${DOCKER_USERNAME} -p ${DOCKER_TOKEN}
```

And then pull your private image at `docker-compose.yml`.

```diff
[...]
  <dev|prod>:
-   image: <dev|prod>
-   build:
-     context: .
-     dockerfile: Dockerfile.prod
+   image: <PRIVATE_IMAGE>
    volumes:
      - yarn:/home/node/.cache/yarn
    tty: true
[...]
```

## Directory Structure

```
.
├── flow-typed  -> module types
├── src
│   ├── api
│   ├── app
│   │   ├── config
│   │   ├── <FEATURE>
│   │   │   ├── actions.js
│   │   │   ├── constants.js
│   │   │   ├── <FEATURE>.vue
│   │   │   ├── getters.js
│   │   │   └── mutations.js
│   │   └── shared
│   ├── assets  -> datas, fonts, images, medias, styles
│   ├── client.js
│   ├── index.html
│   └── server.js
├── tools
├── .babelrc
├── .editorconfig
├── .eslintrc
├── .firebaserc
├── .flowconfig
├── .gitignore
├── .postcssrc
├── .stylelintrc
├── Dockerfile
├── Dockerfile.dev
├── Dockerfile.prod
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
