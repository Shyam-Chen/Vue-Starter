import type { Plugin, UserConfig } from 'vite';
import { createMiddleware } from './server';
import { PLUGIN_NAME } from '.';
import type { VitePluginNodeConfig } from '.';

export function VitePluginNode(cfg: VitePluginNodeConfig): Plugin {
  const config: VitePluginNodeConfig = {
    appPath: cfg.appPath,
    serverPath: cfg.serverPath,
    adapter: cfg.adapter,
    appName: cfg.appName ?? 'app',
    tsCompiler: cfg.tsCompiler ?? 'esbuild',
    exportName: cfg.exportName ?? 'viteNodeApp',
  };

  const plugins: Plugin = {
    name: PLUGIN_NAME,
    config: (_config, { command }) => {
      const entry = command === 'build' ? config.serverPath : config.appPath;

      const plugincConfig: UserConfig & { VitePluginNodeConfig: VitePluginNodeConfig } = {
        build: {
          ssr: entry,
          rollupOptions: {
            input: entry,
            output: [{ format: 'cjs' }, { format: 'es' }],
          },
        },
        server: {
          hmr: false,
          host: true,
        },
        VitePluginNodeConfig: config,
      };

      return plugincConfig;
    },
    configureServer: (server) => {
      server.middlewares.use(createMiddleware(server));

      console.log(server.ws.clients.size);

    },
  };

  return plugins;
}
