import type { FastifyInstance } from 'fastify';

import response from './response';

export default async (app: FastifyInstance) => {
  app.post('', async () => {
    return response.successful;
  });
};
