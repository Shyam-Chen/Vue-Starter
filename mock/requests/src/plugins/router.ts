import plugin from 'fastify-plugin';

import auth from '~/modules/auth';

export default plugin(
  async (app, opts) => {
    const { prefix } = opts;

    app.register(auth, { prefix: prefix + '/auth' });
  },
  { name: 'router' },
);
