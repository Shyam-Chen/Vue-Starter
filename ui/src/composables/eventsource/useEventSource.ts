import { useEventSource } from '@vueuse/core';

export default (url: string, events?: string[], options?: EventSourceInit) =>
  useEventSource(process.env.API_URL + '/api' + url, events, options);
