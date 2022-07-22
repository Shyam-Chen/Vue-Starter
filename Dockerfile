FROM node:14

ENV HOME /Vue-Starter

WORKDIR ${HOME}
ADD . $HOME

# chrome --
ENV CHROME_BIN /usr/bin/chromium
ENV DISPLAY :99

RUN \
  apt-get update && \
  apt-get install -y xvfb chromium libgconf-2-4

ENTRYPOINT ["Xvfb", "-ac", ":99", "-screen", "0", "1280x800x16"]
# -- chrome

# puppeteer --
RUN \
  apt-get update && \
  apt-get install -y wget --no-install-recommends && \
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install -y google-chrome-unstable --no-install-recommends && \
  apt-get purge --auto-remove -y curl
# -- puppeteer

RUN \
  rm -rf /var/lib/apt/lists/* && \
  rm -rf /src/*.deb

RUN pnpm install

EXPOSE 8000
