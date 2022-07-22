import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

import env from './env';

export default defineConfig({
  server: {
    host: env.LISTEN_HOST,
    port: env.LISTEN_PORT,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'fastify',
      appPath: './src/app.ts',
    }),
  ],
});
