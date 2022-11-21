import { createFetch } from '@vueuse/core';

import { i18n } from '~/plugins/i18n';

export default createFetch({
  baseUrl: process.env.API_URL + '/api',
  options: {
    immediate: false,
    async beforeFetch({ options }: any) {
      const token = localStorage.getItem('token');

      if (token) {
        options.headers.Authorization = `Bearer ${token}`;
      }

      if (i18n.global.locale.value) {
        options.headers['Accept-Language'] = i18n.global.locale.value;
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
