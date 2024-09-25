import type { FetchOptions, FetchRequest, FetchResponse } from 'ofetch';
import { ofetch } from 'ofetch';

const fetcher = ofetch.create({
  baseURL: `${process.env.API_URL}/api`,
  async onRequest({ options }) {
    const headers = new Headers(options.headers);

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);

    const language = localStorage.getItem('language');
    if (language) headers.set('Accept-Language', language);

    options.headers = headers;
  },
  async onResponse({ response }) {
    if (response.status === 401 && localStorage.getItem('refreshToken')) {
      const { accessToken } = await ofetch('/auth/token', {
        baseURL: `${process.env.API_URL}/api`,
        method: 'POST',
        body: {
          accessToken: localStorage.getItem('accessToken'),
          refreshToken: localStorage.getItem('refreshToken'),
        },
      });

      localStorage.setItem('accessToken', accessToken);
    }
  },
});

export default async <T>(request: FetchRequest, options?: FetchOptions) => {
  try {
    const response = await fetcher.raw(request, options);
    return response as FetchResponse<T>;
  } catch (error: any) {
    if (error.response?.status === 401 && localStorage.getItem('refreshToken')) {
      const response = await fetcher.raw(request, options);
      return response as FetchResponse<T>;
    }

    return error.response as FetchResponse<T>;
  }
};
