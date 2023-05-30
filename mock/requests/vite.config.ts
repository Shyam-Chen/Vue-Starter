import { resolve } from 'path';
import { defineConfig } from 'vite';
import fastify from 'vite-plugin-fastify';
import fastifyRoutes from 'vite-plugin-fastify-routes';

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  plugins: [fastify(), fastifyRoutes()],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      responses: resolve(__dirname, '../responses'),
    },
  },
});
