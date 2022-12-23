import { createFetch } from '@vueuse/core';

export default createFetch({
  baseUrl: process.env.API_URL + '/api',
  options: {
    immediate: false,
    async beforeFetch({ options }: any) {
      const token = localStorage.getItem('token');
      const language = localStorage.getItem('language');

      if (token) {
        options.headers.Authorization = `Bearer ${token}`;
      }

      if (language) {
        options.headers['Accept-Language'] = language;
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
