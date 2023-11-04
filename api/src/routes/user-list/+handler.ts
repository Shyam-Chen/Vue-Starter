import type { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  app.post('', async () => {
    return {
      result: [
        {
          _id: '6462f6b1c0ae46c0c9fbca5d',
          username: 'shyam.chen',
          email: 'shyam.chen@example.com',
          fullName: 'Shyam Chen',
          status: true,
          otpEnabled: false,
          otpVerified: false,
        },
        {
          _id: '63be5ee2fcd3a5dd3f87566f',
          username: 'deno.land',
          email: 'deno.land@example.com',
          fullName: 'Deno Land',
          status: true,
          otpEnabled: true,
          otpVerified: true,
        },
        {
          _id: '63be5ee2fcd3a5dd3f87566a',
          username: 'bun.sh',
          email: 'bun.sh@example.com',
          fullName: 'Bun Sh',
          status: true,
          otpEnabled: true,
          otpVerified: false,
        },
        {
          _id: '63c62f9c4c6b19974bb48f87',
          username: 'paula.wilson',
          fullName: 'Paula Wilson',
          email: 'paula.wilson@example.com',
          status: false,
          otpEnabled: false,
          otpVerified: false,
        },
      ],
      total: 4,
    };
  });
};
