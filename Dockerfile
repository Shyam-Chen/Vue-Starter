FROM node:20

WORKDIR /usr/src/app
ADD . .

RUN npx -y playwright@1.44.0 install --with-deps

RUN npm install -g pnpm
RUN pnpm install
