export default (app, opts, done) => {
  app.get('/', async (req, reply) => {
    return { cats: [] };
  });

  done();
};
