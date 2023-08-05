import type { FastifyInstance } from 'fastify';
import auth from 'responses/auth';

export default async (app: FastifyInstance) => {
  app.post('', async (request, reply) => {
    return reply.send(auth['post_/sign-in']);
    // return reply.send(auth['post_/sign-in_2fa']);
    // return reply.send(auth['post_/sign-in_2fa_unverified']);
    // return reply.code(400).send(auth['post_/sign-in_error']);
  });
};
