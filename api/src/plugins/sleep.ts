import plugin from 'fastify-plugin';

export default plugin(
  async (app) => {
    app.addHook('onRequest', async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  },
  { name: 'sleep' },
);
