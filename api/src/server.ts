import app from './app';

const server = app();

const start = async () => {
  try {
    await server.listen({ host: '127.0.0.1', port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
