import type { FastifyInstance } from 'fastify';
import auth from 'responses/auth';

export default async (app: FastifyInstance) => {
  app.post('/sign-in', async () => {
    return auth['post_/sign-in'];
  });

  app.get('/user', async () => {
    return auth['get_/user'];
  });
};
