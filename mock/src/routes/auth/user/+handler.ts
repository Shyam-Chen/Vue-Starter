import type { FastifyInstance } from 'fastify';

import response from './response';

export default async (app: FastifyInstance) => {
  app.get('', async () => {
    return response['admin'];
  });
};
