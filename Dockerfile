FROM mcr.microsoft.com/playwright:v1.41-jammy

ENV HOME=/vue-starter

WORKDIR ${HOME}
ADD . $HOME

RUN npm install -g pnpm
RUN pnpm install
