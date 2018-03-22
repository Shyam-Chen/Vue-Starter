# Vue Fullstack Starter

:poodle: A boilerplate for Vue, Material, Express, Babel, Flow, and ReactiveX.

[![Build Status](https://img.shields.io/circleci/project/Shyam-Chen/Vue-Fullstack-Starter/develop.svg)](https://circleci.com/gh/Shyam-Chen/Vue-Fullstack-Starter)
[![Coverage Status](https://img.shields.io/codecov/c/github/Shyam-Chen/Vue-Fullstack-Starter/develop.svg)](https://codecov.io/gh/Shyam-Chen/Vue-Fullstack-Starter)
 //
[![dependencies Status](https://david-dm.org/Shyam-Chen/Vue-Fullstack-Starter/status.svg)](https://david-dm.org/Shyam-Chen/Vue-Fullstack-Starter)
[![devDependencies Status](https://david-dm.org/Shyam-Chen/Vue-Fullstack-Starter/dev-status.svg)](https://david-dm.org/Shyam-Chen/Vue-Fullstack-Starter?type=dev)

[Live Demo](https://vue-by-example.firebaseapp.com/)

## Table of Contents

* [Getting Started](#getting-started)
* Project Template
* [Practical Examples](#practical-examples)
* Dockerization
* [Configuration](#configuration)
* Directory Structure

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

3. Run the Application

```bash
# front-end
$ yarn start:app

# back-end
$ yarn start:api
$ firebase serve --only functions
```

4. Build the Application

```bash
# front-end
$ yarn build:app

# back-end
$ yarn build:api
```

5. Test the Application

```bash
# front-end
$ yarn test:app

# back-end
$ yarn test:api
```

## Practical Examples

* [ ] CRUD Operations
  * [ ] Basic
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
  * [ ] Calendar
  * [ ] Media
  * [ ] QR Code

## Configuration

### Project environments

Change to your projects

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

`Dockerfile.dev` or `Dockerfile.prod`

```dockerfile
[...]
# .env --
ENV NODE_ENV production

ENV SITE_URL https://vue-by-example.firebaseapp.com

ENV FUNC_URL https://us-central1-vue-by-example.cloudfunctions.net
# -- .env
[...]
```

Don't add `Docker.<ENV>` in version control.

So you need to push it to the private Docker Hub and pull it off.

```bash
$ docker login
$ docker push DOCKER_ID_USER/IMAGE_NAME
```

After you have a private image, you can login via Docker on the CircleCI.

```sh
docker login -u ${DOCKER_USERNAME} -p ${DOCKER_TOKEN}
```

And then pull the private image in `docker-compose.yml`.

```diff
[...]
  <dev|stage|prod>:
-   image: prod
-   build:
-     context: .
-     dockerfile: Dockerfile.prod
+   image: <PRIVATE_IMAGE>
    volumes:
      - yarn:/home/node/.cache/yarn
    tty: true
[...]
```
