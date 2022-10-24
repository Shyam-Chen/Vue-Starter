import type { UseWebSocketOptions } from '@vueuse/core';
import { useWebSocket } from '@vueuse/core';

export default <T>(url: string, options?: UseWebSocketOptions) => {
  if (process.env.API_UR) {
    const apiUrl = new URL(process.env.API_UR);
    const protocol = apiUrl.protocol === 'https:' ? 'wss:' : 'ws:';
    return useWebSocket<T>(protocol + '//' + apiUrl.host + '/io' + url, options);
  }

  const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
  return useWebSocket<T>(protocol + '//' + location.host + '/io' + url, options);
};
