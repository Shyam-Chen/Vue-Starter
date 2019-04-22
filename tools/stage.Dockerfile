FROM node:8

ENV HOME /Vue-Play

WORKDIR ${HOME}
ADD . $HOME

RUN yarn install

ENV NODE_ENV production

# envs --
ENV SITE_URL https://vue-by-example-stage.firebaseapp.com
ENV FUNC_URL https://us-central1-vue-by-example-stage.cloudfunctions.net

ENV FIREBASE_API_KEY AIzaSyCvhvJ1buNiNRxUzQub8Eg1PO65EtTIurA
ENV FIREBASE_AUTH_DOMAIN vue-by-example-stage.firebaseapp.com
ENV FIREBASE_DATABASE_URL https://vue-by-example-stage.firebaseio.com
ENV FIREBASE_PROJECT_ID vue-by-example-stage
ENV FIREBASE_STORAGE_BUCKET vue-by-example-stage.appspot.com
ENV FIREBASE_MESSAGING_SENDER_ID 1097057218485

ENV SENTRY_DSN https://cea15151a5984c6e80937903b07ae124@sentry.io/1192108
# -- envs

RUN yarn build:app
RUN yarn build:api && cd functions && yarn install
