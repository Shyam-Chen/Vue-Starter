import type http from 'http';
import type { Connect, UserConfig, ViteDevServer } from 'vite';

export { VitePluginNode as default } from './vite-plugin-node';

export const PLUGIN_NAME = 'vite-plugin-fastify';

export declare type SupportedFrameworks = 'fastify';

export declare interface RequestAdapterParams<App> {
  app: App
  server: ViteDevServer
  req: http.IncomingMessage
  res: http.ServerResponse
  next: Connect.NextFunction
}

export declare type RequestAdapter<App = any> = (params: RequestAdapterParams<App>) => void | Promise<void>;

export declare type RequestAdapterOption = SupportedFrameworks | RequestAdapter;

export declare type SupportedTSCompiler = 'esbuild';

export interface VitePluginNodeConfig {
  appPath: string
  serverPath: string
  adapter: RequestAdapterOption
  appName?: string
  exportName?: string
  tsCompiler?: SupportedTSCompiler
}

export declare interface ViteConfig extends UserConfig {
  VitePluginNodeConfig: VitePluginNodeConfig
}
