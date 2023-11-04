import type { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  app.post('', async () => {
    return {
      result: [
        {
          _id: '643e4d8f178309ee94a8dcb8',
          title: 'Vue',
          completed: true,
        },
      ],
      total: 1,
    };
  });
};
