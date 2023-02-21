import path from 'path';
import { defineConfig } from 'vite';
import fastify from 'vite-plugin-fastify';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    fastify({
      appPath: './src/app.ts',
      serverPath: './src/server.ts',
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      responses: path.resolve(__dirname, '../responses'),
    },
  },
});
