import fastify from 'fastify';

import router from '~/plugin/router';
import websocket from '~/plugin/websocket';

const app = async (options = {}) => {
  const app = fastify(options);

  app.register(router, { prefix: '/api' });
  app.register(websocket, { prefix: '/api' });

  return app;
};

export default app;
