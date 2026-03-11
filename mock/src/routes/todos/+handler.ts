import type { FastifyInstance } from 'fastify';

import response from './response.ts';

export default async (app: FastifyInstance) => {
  app.post('', async () => {
    return response.basic;
  });
};
