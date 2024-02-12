import type { FastifyInstance } from 'fastify';

import response from './response';

export default async (app: FastifyInstance) => {
  app.post('', async (request, reply) => {
    return reply.send(response['successful']);
    return reply.code(400).send(response['failed']);
    return reply.send(response['successful_hasMFA']);
    return reply.send(response['successful_hasMFA_unverified']);
  });
};
