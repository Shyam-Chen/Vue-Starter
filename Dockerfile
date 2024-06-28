FROM node:20

WORKDIR /usr/src/app
ADD . .

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

RUN npx -y playwright@1.45.0 install --with-deps

RUN corepack use pnpm@9
