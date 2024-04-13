FROM node:20 as base

WORKDIR /usr/src/app
ADD . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

FROM caddy:2

COPY --from=base /usr/src/app/iac/Caddyfile /etc/caddy/Caddyfile
COPY --from=base /usr/src/app/app/dist /usr/share/caddy
