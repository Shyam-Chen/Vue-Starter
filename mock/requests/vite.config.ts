import path from 'path';
import { defineConfig } from 'vite';
import fastify from 'vite-plugin-fastify';
import fastifyRoutes from 'vite-plugin-fastify-routes';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [fastify(), fastifyRoutes()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      responses: path.resolve(__dirname, '../responses'),
    },
  },
});
