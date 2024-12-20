import type { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  app.post('', async () => {
    return {
      result: [
        {
          _id: '6462f6b1c0ae46c0c9fbca5d',
          username: 'shyam.chen',
          fullName: 'Shyam Chen',
          email: 'shyam.chen@example.com',
          role: 'admin',
          status: true,
          otpEnabled: false,
          otpVerified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          _id: '63be5ee2fcd3a5dd3f87566f',
          username: 'rich.trott',
          fullName: 'Rich Trott',
          email: 'rich.trott@example.com',
          role: 'admin',
          status: true,
          otpEnabled: true,
          otpVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          _id: '63be5ee2fcd3a5dd3f87566a',
          username: 'ryan.dahl',
          fullName: 'Ryan Dahl',
          email: 'ryan.dahl@example.com',
          role: 'admin',
          status: true,
          otpEnabled: true,
          otpVerified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          _id: '63c62f9c4c6b19974bb48f87',
          username: 'ben.noordhuis',
          fullName: 'Ben Noordhuis',
          email: 'ben.noordhuis@example.com',
          role: 'admin',
          status: false,
          otpEnabled: false,
          otpVerified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      total: 4,
    };
  });
};
