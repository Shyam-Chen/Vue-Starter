FROM node:lts-bullseye-slim as builder

ENV HOME /vue-starter

WORKDIR ${HOME}
ADD . $HOME

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

ARG api_url
ENV API_URL=$api_url

RUN pnpm build

FROM caddy:2-alpine

COPY --from=builder /Caddyfile /etc/Caddyfile
COPY --from=builder /dist /usr/share/caddy/html
