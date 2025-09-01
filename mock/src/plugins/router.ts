import routes from 'virtual:fastify-routes';
import plugin from 'fastify-plugin';

export default plugin(
  async (app) => {
    routes(app, { prefix: '/api' });
  },
  { name: 'router' },
);
