import fastify from 'fastify';

import router from '~/plugins/router';

const app = async (options = {}) => {
  const app = fastify(options);

  app.register(router, { prefix: '/api' });

  return app;
};

export default app;
