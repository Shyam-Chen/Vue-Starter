// import { request } from '@x/ui';
import type { NavigationGuard } from 'vue-router';

import { useBaselineStore } from '~/layouts/baseline';

export default (async () => {
  if (!localStorage.getItem('accessToken')) {
    return { path: '/sign-in' };
  }

  const expiresIn = localStorage.getItem('expiresIn');

  if (expiresIn && new Date().toISOString() >= expiresIn) {
    return { path: '/sign-in' };
  }

  // const response = await request('/auth/user', { method: 'GET' });
  //
  // if (!response.ok) {
  //   return { path: '/sign-in' };
  // }

  const user = {
    message: 'OK',
    _id: '6462f6b2c0ae46c0c9fbca5e',
    username: 'shyam.chen',
    email: 'shyam.chen@example.com',
    fullName: 'Shyam Chen',
    status: true,
    otpEnabled: false,
    otpVerified: false,
    createdAt: '2023-05-16T03:21:21.728Z',
    updatedAt: '2023-05-16T03:21:21.729Z',
    role: 'admin',
    permissions: [
      {
        resource: '*',
        action: '*',
      },
    ],
  };

  const baselineStore = useBaselineStore();
  baselineStore.state.user = user;

  return true;
}) as NavigationGuard;
