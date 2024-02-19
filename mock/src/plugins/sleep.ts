import { setTimeout as sleep } from 'timers/promises';
import plugin from 'fastify-plugin';

export default plugin(
  async (app) => {
    app.addHook('onRequest', async () => {
      await sleep(333.33);
    });
  },
  { name: 'sleep' },
);
