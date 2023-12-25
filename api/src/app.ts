import fastify from 'fastify';
import multipart from '@fastify/multipart';

import router from '~/plugins/router';
import sleep from '~/plugins/sleep';

export default () => {
  const app = fastify({
    logger: {
      transport: {
        target: '@fastify/one-line-logger',
      },
    },
  });

  app.register(multipart);

  app.register(router);
  // app.register(sleep);

  return app;
};
