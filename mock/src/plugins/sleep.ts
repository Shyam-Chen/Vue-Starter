import { setTimeout as sleep } from 'node:timers/promises';
import plugin from 'fastify-plugin';

export default plugin(
  async (app) => {
    app.addHook('onRequest', async () => {
      await sleep(333.33);
    });
  },
  { name: 'sleep' },
);
