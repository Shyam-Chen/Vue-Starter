FROM mcr.microsoft.com/playwright:v1.40.0-jammy

ENV HOME=/vue-starter

WORKDIR ${HOME}
ADD . $HOME

RUN npm install -g pnpm
RUN pnpm install

RUN apt-get update && \
    apt-get install -y curl && \
    curl -L -o caddy.tar.gz https://github.com/caddyserver/caddy/releases/download/v2.7.5/caddy_2.7.5_linux_amd64.tar.gz && \
    tar -xzf caddy.tar.gz && \
    rm -f caddy.tar.gz && \
    mv caddy /usr/bin/caddy && \
    chmod +x /usr/bin/caddy
