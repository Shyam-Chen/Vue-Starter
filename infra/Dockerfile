FROM node:20 as base

WORKDIR /usr/src/app
ADD . .

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN pnpm install
RUN pnpm build

FROM caddy:2

ARG SITE_ADDRESS
ENV SITE_ADDRESS=$SITE_ADDRESS

COPY --from=base /usr/src/app/infra/Caddyfile /etc/caddy/Caddyfile
COPY --from=base /usr/src/app/app/dist /usr/share/caddy
