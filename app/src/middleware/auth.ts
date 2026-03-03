// import { request } from '@x/ui';
import type { NavigationGuard } from 'vue-router';

// import { Baseline, useBaselineStore } from '~/layouts/baseline';

export default (async () => {
  if (!localStorage.getItem('accessToken')) {
    return { path: '/sign-in' };
  }

  const expiresIn = localStorage.getItem('expiresIn');

  if (expiresIn && new Date().toISOString() >= expiresIn) {
    return { path: '/sign-in' };
  }

  // const response = await request('/auth/user', { method: 'GET' });

  // if (!response.ok) {
  //   return { path: '/sign-in' };
  // }

  // const baselineStore = useBaselineStore();
  // baselineStore.state.user = response._data;

  return true;
}) as NavigationGuard;
