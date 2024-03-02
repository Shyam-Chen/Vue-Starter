import plugin from 'fastify-plugin';
import { setTimeout as sleep } from 'timers/promises';

export default plugin(
  async (app) => {
    app.addHook('onRequest', async () => {
      await sleep(333.33);
    });
  },
  { name: 'sleep' },
);
