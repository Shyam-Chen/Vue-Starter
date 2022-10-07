import plugin from 'fastify-plugin';

import signIn from '~/modules/sign-in';

export default plugin(
  async (app, opts, done) => {
    const { prefix } = opts;

    app.register(signIn, { prefix });

    done();
  },
  { name: 'router' },
);
