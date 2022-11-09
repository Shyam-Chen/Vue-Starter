import app from './app';

const start = async () => {
  const server = await app();

  try {
    server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
