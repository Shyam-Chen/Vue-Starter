FROM node:20-bookworm-slim as base

WORKDIR /usr/src/app
ADD . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

FROM caddy:2-alpine

COPY --from=base ./Caddyfile /etc/caddy/Caddyfile
COPY --from=base ./dist /usr/share/caddy
