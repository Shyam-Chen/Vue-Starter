FROM node:8

ENV HOME /VueFastify-Fullstack-Starter

WORKDIR ${HOME}
ADD . $HOME

RUN yarn install

ENV NODE_ENV production

# envs --
ENV SITE_URL https://vue-by-example-prod.firebaseapp.com
ENV FUNC_URL https://us-central1-vue-by-example-prod.cloudfunctions.net

ENV FIREBASE_API_KEY AIzaSyBjpbfcqbebvZsud3nPrXAYl2N5E7gKa3M
ENV FIREBASE_AUTH_DOMAIN vue-by-example-prod.firebaseapp.com
ENV FIREBASE_DATABASE_URL https://vue-by-example-prod.firebaseio.com
ENV FIREBASE_PROJECT_ID vue-by-example-prod
ENV FIREBASE_STORAGE_BUCKET vue-by-example-prod.appspot.com
ENV FIREBASE_MESSAGING_SENDER_ID 68202118647

ENV SENTRY_DSN https://cea15151a5984c6e80937903b07ae124@sentry.io/1192108
# -- envs

RUN yarn build:app
RUN yarn build:api && cd functions && yarn install
