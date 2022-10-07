import app from './app';

const start = async () => {
  const server = await app({ logger: true });

  try {
    server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
