FROM buildpack-deps:jessie

ENV HOME /React-Fullstack-Starter

WORKDIR ${HOME}
ADD . $HOME

ENV NODE 8

RUN \
  curl -sL https://deb.nodesource.com/setup_$NODE.x | bash - && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && \
  apt-get install -y nodejs yarn

RUN rm -rf /var/lib/apt/lists/*

RUN yarn install && yarn build && yarn build:backend

ENV NODE_ENV production

EXPOSE 3000

CMD ["node", "dist/pm2.js"]
