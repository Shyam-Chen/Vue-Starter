FROM mcr.microsoft.com/playwright:v1.43.0-jammy

WORKDIR /usr/src/app
ADD . .

RUN npm install -g pnpm
RUN pnpm install
