import { createFetch } from '@vueuse/core';

import { i18n } from '~/plugins/i18n';

export const useSysFetch = createFetch({
  baseUrl: '/api',
  options: {
    async beforeFetch({ options }) {
      const token = localStorage.getItem('token');

      if (token) {
        options.headers.Authorization = `Bearer ${token}`;
      }

      if (i18n.global.locale.value) {
        options.headers['Accept-Language'] = i18n.global.locale.value;
      }

      return { options };
    },
  },
});
