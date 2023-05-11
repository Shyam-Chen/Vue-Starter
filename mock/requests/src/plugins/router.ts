import plugin from 'fastify-plugin';

import routes from 'virtual:fastify-routes';

export default plugin(
  async (app) => {
    routes(app, { prefix: '/api' });
  },
  { name: 'router' },
);
