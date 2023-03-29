FROM node:lts-bullseye-slim

ENV HOME /vue-starter

WORKDIR ${HOME}
ADD . $HOME

RUN npm install -g pnpm caddy-npm
RUN pnpm install
RUN npx playwright install --with-deps
