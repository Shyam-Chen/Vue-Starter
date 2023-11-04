import { createFetch } from '@vueuse/core';

export default createFetch({
  baseUrl: process.env.API_URL + '/api',
  options: {
    immediate: false,
    async beforeFetch({ options }) {
      const accessToken = localStorage.getItem('accessToken');
      const language = localStorage.getItem('language');

      if (accessToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }

      if (language) {
        options.headers = {
          ...options.headers,
          'Accept-Language': language,
        };
      }

      return { options };
    },
    afterFetch(ctx) {
      if (ctx.response.status === 401) {
        // Unauthorized
      }

      if (ctx.response.status === 440) {
        // Login Time-out
      }

      return ctx;
    },
  },
});
