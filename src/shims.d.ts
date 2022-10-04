declare module '*.vue' {
  import { type DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare const API_URL: string;

declare module 'vue-formor' {
  export const useSchema: any;
}
