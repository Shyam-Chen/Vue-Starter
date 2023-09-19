FROM node:lts-bullseye-slim AS builder

ENV HOME /vue-starter

WORKDIR ${HOME}
ADD . $HOME

RUN npm install -g pnpm
RUN pnpm install

ARG api_url
ENV API_URL=$api_url

RUN pnpm build

FROM caddy:2-alpine

COPY --from=builder /vue-starter/.circleci/Caddyfile /etc/Caddyfile
COPY --from=builder /vue-starter/dist /usr/share/caddy/html
