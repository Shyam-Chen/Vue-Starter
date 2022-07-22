import fastify from 'fastify';

import helloWorld from './hello-world/routes';

const app = async (options = {}) => {
  const app = fastify(options);

  app.get('/', (req, reply) => {
    reply.send('change me to see updates, fastify!');
  });

  app.register(helloWorld);

  return app;
};

export const viteNodeApp = app({ logger: true });
