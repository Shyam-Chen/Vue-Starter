import type { FastifyInstance } from 'fastify';
import auth from 'responses/auth';

export default async (app: FastifyInstance) => {
  app.post('', async () => {
    return auth['post_/sign-in'];
  });
};
