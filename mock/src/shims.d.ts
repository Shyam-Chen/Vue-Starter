/// <reference types="vite-plugin-fastify-routes/client" />

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;

    HOST: string;
    PORT: number;
  }
}
