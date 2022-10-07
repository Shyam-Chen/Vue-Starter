import plugin from 'fastify-plugin';
import { FastifySSEPlugin } from 'fastify-sse-v2';

import sse from '~/modules/sse';

export default plugin(
  async (app, opts, done) => {
    const { prefix } = opts;

    app.register(FastifySSEPlugin);

    app.register(sse, { prefix });

    done();
  },
  { name: 'eventsource' },
);
