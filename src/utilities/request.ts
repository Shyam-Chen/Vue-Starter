import { ofetch } from 'ofetch';

export default ofetch.create({
  baseURL: process.env.API_URL + '/api',
  retry: 1,
  async onRequest({ options }) {
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
  },
  async onResponse({ options, response }) {
    if (response.status === 401) {
      // Unauthorized

      if (localStorage.getItem('refreshToken')) {
        const { accessToken } = await ofetch('/auth/token', {
          baseURL: process.env.API_URL + '/api',
          method: 'POST',
          body: {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
          },
          onRequest() {
            const language = localStorage.getItem('language');

            if (language) {
              options.headers = {
                ...options.headers,
                'Accept-Language': language,
              };
            }
          },
        });

        localStorage.setItem('accessToken', accessToken);
      }
    }

    if (response.status === 440) {
      // Login Time-out
    }
  },
});
