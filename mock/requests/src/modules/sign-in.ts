export default (app, opts, done) => {
  app.post('/sign-in', async (req, reply) => {
    return { token: 'xxx' };
  });

  done();
};
