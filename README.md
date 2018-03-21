# Vue Fullstack Starter

:poodle: A boilerplate for Vue, Material, Express, Babel, Flow, and ReactiveX.

[![Build Status](https://img.shields.io/circleci/project/Shyam-Chen/Vue-Fullstack-Starter/master.svg)](https://circleci.com/gh/Shyam-Chen/Vue-Fullstack-Starter)
[![Coverage Status](https://img.shields.io/codecov/c/github/Shyam-Chen/Vue-Fullstack-Starter/master.svg)](https://codecov.io/gh/Shyam-Chen/Vue-Fullstack-Starter)
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

Default configuration

```bash
# .env

NODE_ENV=development

FUNC_URL=http://localhost:5000/vue-by-example/us-central1
```

Deploy Configuration

```dockerfile
FROM node:8

ENV HOME /Vue-FullStarter-Kit

WORKDIR ${HOME}
ADD . $HOME

RUN yarn install

# .env --
ENV NODE_ENV production

ENV FUNC_URL https://us-central1-vue-by-example.cloudfunctions.net
# -- .env

RUN yarn build:app
RUN yarn build:api && cd functions && yarn install
```

How Secure?

Don't add Docker.prod in version control. You need to push it onto the private Docker Hub and pull it off.

```bash
$ docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}
```

```yml
[...]
  prod:
    image: <PRIVATE_IMAGE>
    volumes:
      - yarn:/home/node/.cache/yarn
    tty: true
[...]
```
