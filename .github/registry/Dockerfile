FROM node:24 AS base

WORKDIR /usr/src/app
ADD . .

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm
RUN corepack use pnpm@9

RUN pnpm build

FROM caddy:2

ARG SITE_ADDRESS
ENV SITE_ADDRESS=$SITE_ADDRESS

COPY --from=base /usr/src/app/.github/registry/Caddyfile /etc/caddy/Caddyfile
COPY --from=base /usr/src/app/app/dist /usr/share/caddy
