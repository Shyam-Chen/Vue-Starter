import { reactive, inject } from 'vue';
import { useRouter } from 'vue-router';

import { defineContext, useFetch } from '~/composables';

import type { State } from './types';

export const stateSymbol = Symbol('/sign-in');

export const createState = reactive<State>({
  signInForm: {
    username: 'shyam.chen',
    password: '12345678',
  },

  signedIn: false,

  errors: {},
});

export const useState = () => inject(stateSymbol) as State;

export const useActions = () => {
  const router = useRouter();
  const signInApi = useFetch('/auth/sign-in', { immediate: false }).json();
  const state = useState();

  const actions = {
    async signIn() {
      state.signedIn = true;

      await signInApi.post(state.signInForm).execute();

      if (signInApi.statusCode.value === 200) {
        const { token } = signInApi.data.value;
        localStorage.setItem('token', token);
        await router.push('/dashboard');
        state.signedIn = false;
      } else {
        const { message } = signInApi.data.value;
        const found = message.match(/(#+[a-zA-Z0-9(_)]{1,})/gm)[0];
        state.errors['signInForm.' + found.replace('#', '')] = message.replace(found + ' ', '');
        state.signedIn = false;
      }
    },
  };

  return actions;
};

export const useComputeds = () => {
  // const state = useState();

  const computeds = {};

  return computeds;
};

export default () => defineContext(stateSymbol, createState);
