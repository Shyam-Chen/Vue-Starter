import { reactive, readonly } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { defineStore } from 'vue-storer';
import { formatISO, add } from 'date-fns';

import request from '~/utilities/request';

export default defineStore('/sign-in', () => {
  const router = useRouter();
  const route = useRoute();

  const state = reactive({
    signInForm: {
      username: 'shyam.chen',
      password: '12345678',
    },
    code: '',

    signedIn: false,
    otpEnabled: false,

    errors: {} as Record<string, string>,
  });

  const actions = readonly({
    async signIn() {
      state.signedIn = true;

      const response = await request<any>('/auth/sign-in', {
        method: 'POST',
        body: state.signInForm,
      });

      if (response.status === 200) {
        const { accessToken, refreshToken, otpEnabled, otpVerified } = response._data;

        // general
        if (accessToken && !otpEnabled && !otpVerified) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('expiresIn', formatISO(add(new Date(), { hours: 12 })));
          const path = route.redirectedFrom?.path || '/dashboard';
          await router.push(path === '/' ? '/dashboard' : path);
        }

        // 2fa
        if (!accessToken && otpEnabled && otpVerified) {
          state.otpEnabled = true;
        }

        // 2fa_unverified
        if (accessToken && otpEnabled && !otpVerified) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('expiresIn', formatISO(add(new Date(), { hours: 12 })));
          await router.push('/two-factor-auth');
        }
      } else {
        const { message } = response._data;
        const found = message.match(/(#+[a-zA-Z0-9(_)]{1,})/gm)[0];
        state.errors[found.replace('#', '')] = message.replace(found + ' ', '');
        state.signedIn = false;
      }
    },
    async inputCode() {
      if (state.code.length === 6) {
        const response = await request<any>('/auth/otp/validate', {
          method: 'POST',
          body: {
            code: state.code,
            username: state.signInForm.username,
            password: state.signInForm.password,
          },
        });

        if (response.status === 200) {
          const { accessToken, refreshToken } = response._data;
          await actions.twoFactor(accessToken, refreshToken);
        }
      }
    },
    async twoFactor(accessToken: string, refreshToken: string) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('expiresIn', formatISO(add(new Date(), { hours: 12 })));
      await router.push(route.redirectedFrom?.path || '/dashboard');
    },
  });

  return { state, actions };
});
