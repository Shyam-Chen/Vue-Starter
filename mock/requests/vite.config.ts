import path from 'path';
import { defineConfig } from 'vite';
import fastify from './vite-plugin-fastify';
import envify from 'process-envify';

import env from './env';

export default defineConfig({
  define: envify(env),
  server: {
    port: 3000,
  },
  plugins: [
    fastify({
      appPath: './src/app.ts',
      serverPath: './src/server.ts',
      adapter: 'fastify',
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  test: {},
});
