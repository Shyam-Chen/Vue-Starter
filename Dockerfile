FROM buildpack-deps:jessie

ENV HOME /Vue-Fullstack-Starter

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

RUN yarn install

EXPOSE 8000
