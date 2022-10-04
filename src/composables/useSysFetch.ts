import { createFetch } from '@vueuse/core';

export const useSysFetch = createFetch({
  baseUrl: process.env.API_URL,
  options: {
    async beforeFetch({ options }) {
      const token = sessionStorage.getItem('token');

      if (token) {
        options.headers.Authorization = `Bearer ${token}`;
      }

      return { options };
    },
  },
});
