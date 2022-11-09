import type { FastifyInstance } from 'fastify';
import responses from '../../../responses/auth';

export default async (app: FastifyInstance) => {
  app.post('/sign-in', async () => {
    return responses['post_/sign-in'];
  });

  app.get('/user', async () => {
    return {
      username: 'shyam.chen',
      fullName: 'Shyam Chen',
    };
  });
};
