FROM node:24

WORKDIR /usr/src/app
ADD . .

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm
RUN corepack use pnpm@10.x

RUN pnpm exec playwright install --with-deps
