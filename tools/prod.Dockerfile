FROM node:10-alpine

ENV HOME /Vue-Starter

WORKDIR ${HOME}
ADD . $HOME

RUN yarn install

ENV NODE_ENV production

# envs --
ENV SITE_URL https://vue-by-example-prod.web.app

ENV SENTRY_DSN https://cea15151a5984c6e80937903b07ae124@sentry.io/1192108
# -- envs

RUN yarn build
