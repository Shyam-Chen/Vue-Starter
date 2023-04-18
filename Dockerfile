FROM node:lts-bullseye-slim
FROM mcr.microsoft.com/playwright:focal

ENV HOME /vue-starter

WORKDIR ${HOME}
ADD . $HOME

RUN npm install -g pnpm caddy-npm
RUN pnpm install
