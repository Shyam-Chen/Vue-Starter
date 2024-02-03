import plugin from 'fastify-plugin';

export default plugin(
  async (app) => {
    app.addHook('onRequest', async () => {
      await new Promise((resolve) => setTimeout(resolve, 333.33));
    });
  },
  { name: 'sleep' },
);
