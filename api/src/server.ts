import app from './app';

const server = app();

const start = async () => {
  try {
    await server.listen({ host: process.env.HOST, port: process.env.PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
