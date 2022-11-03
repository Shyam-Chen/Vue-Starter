FROM node:lts-bullseye-slim

ENV HOME /vue-starter

WORKDIR ${HOME}
ADD . $HOME

RUN npm install -g pnpm
RUN pnpm -v
RUN pnpm install --frozen-lockfile
