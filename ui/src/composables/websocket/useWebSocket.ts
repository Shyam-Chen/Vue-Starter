import type { UseWebSocketOptions } from '@vueuse/core';
import { useWebSocket } from '@vueuse/core';

export default <T>(url: string, options?: UseWebSocketOptions) => {
  if (process.env.API_URL) {
    const apiUrl = new URL(process.env.API_URL);
    const protocol = apiUrl.protocol === 'https:' ? 'wss:' : 'ws:';
    return useWebSocket<T>(protocol + '//' + apiUrl.host + '/api' + url, options);
  }

  const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
  return useWebSocket<T>(protocol + '//' + location.host + '/api' + url, options);
};
