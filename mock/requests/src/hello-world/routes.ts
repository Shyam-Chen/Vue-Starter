import plugin from 'fastify-plugin';

import controller from './controller';

export default plugin(
  async (app) => {
    app.register(controller, { prefix: '/hello-world' });
  },
  { name: 'helloWorld' },
);
