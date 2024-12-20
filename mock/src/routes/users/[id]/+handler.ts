import type { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  app.get('', async () => {
    return {
      result: {
        _id: '6462f6b2c0ae46c0c9fbca5e',
        username: 'shyam.chen',
        email: 'shyam.chen@example.com',
        fullName: 'Shyam Chen',
        status: true,
        otpEnabled: false,
        otpVerified: false,
        role: 'admin',
        permissions: [
          {
            resource: '*',
            action: '*',
          },
        ],
      },
    };
  });
};
