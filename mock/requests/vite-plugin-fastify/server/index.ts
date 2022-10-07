import type http from 'http';
import { exit } from 'process';
// import chalk from 'chalk';
// import picocolors from 'picocolors';
import type { Connect, Plugin, ViteDevServer } from 'vite';
import type { RequestAdapter, RequestAdapterOption, ViteConfig, VitePluginNodeConfig } from '..';
import { PLUGIN_NAME } from '..';
// import { createDebugger } from '../utils';
import { FastifyHandler } from './fastify';

// export const debugServer = createDebugger('vite:node-plugin:server');

export const SUPPORTED_FRAMEWORKS = {
  fastify: FastifyHandler,
};

export const getPluginConfig = (
  server: ViteDevServer,
): VitePluginNodeConfig => {
  const plugin = server.config.plugins.find(
    p => p.name === PLUGIN_NAME,
  ) as Plugin;

  if (!plugin) {
    console.error('Please setup VitePluginNode in your vite.config.js first');
    exit(1);
  }

  return (plugin.config!({}, { command: 'serve', mode: '' }) as ViteConfig)
    .VitePluginNodeConfig;
};

const getRequestHandler = (
  handler: RequestAdapterOption,
): RequestAdapter | undefined => {
  if (typeof handler === 'function') {
    // debugServer(chalk.dim`using custom server handler`);
    return handler;
  }
  // debugServer(chalk.dim`creating ${handler} node server`);
  return SUPPORTED_FRAMEWORKS[handler] as RequestAdapter;
};

export const createMiddleware = (
  server: ViteDevServer,
): Connect.HandleFunction => {
  const config = getPluginConfig(server);
  const logger = server.config.logger;
  const requestHandler = getRequestHandler(config.adapter);

  if (!requestHandler) {
    console.error('Failed to find a request handler');
    process.exit(1);
  }

  return async function (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    next: Connect.NextFunction,
  ): Promise<void> {
    const appModule = await server.ssrLoadModule(config.appPath);
    let app = appModule.default;
    if (!app) {
      logger.error(
        `Failed to find a named export ${config.exportName} from ${config.appPath}`,
      );
      process.exit(1);
    } else {
      // some app may be created with a function returning a promise
      app = await app({ logger: true });
      await requestHandler({ app, server, req, res, next });
    }
  };
};
