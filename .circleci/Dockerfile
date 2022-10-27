FROM node:lts-bullseye-slim as builder

ENV HOME /vue-starter

WORKDIR ${HOME}
ADD . $HOME

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
RUN pnpm install --frozen-lockfile

ARG api_url
ENV API_URL=$api_url

RUN pnpm build

FROM caddy:2-alpine

COPY --from=builder /Caddyfile /etc/Caddyfile
COPY --from=builder /dist /usr/share/caddy/html
