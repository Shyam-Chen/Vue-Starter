import { ofetch } from 'ofetch';

export default ofetch.create({
  baseURL: process.env.API_URL + '/api',
  async onRequest({ options }) {
    const token = localStorage.getItem('token');
    const language = localStorage.getItem('language');

    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    if (language) {
      options.headers = {
        ...options.headers,
        'Accept-Language': language,
      };
    }
  },
  async onResponse({ response }) {
    if (response.status === 401) {
      // Unauthorized
    }

    if (response.status === 440) {
      // Login Time-out
    }
  },
});
