import type { FastifyInstance } from 'fastify';
import auth from 'responses/auth';

export default async (app: FastifyInstance) => {
  app.get('', async () => {
    return auth['get_/user'];
  });
};
