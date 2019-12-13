FROM node:10-alpine

ENV HOME /Vue-Starter

WORKDIR ${HOME}
ADD . $HOME

ENV NODE_ENV production
ENV NPM_CONFIG_PRODUCTION false

RUN yarn install
RUN yarn build
