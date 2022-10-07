import { reactive, inject } from 'vue';
import { useRouter } from 'vue-router';

import { defineContext, useSysFetch } from '~/composables';

import type { State } from './types';

export const stateSymbol = Symbol('/sign-in');

export const createState = reactive({
  signInForm: {},
  signedIn: false,

  errors: {},
});

export const useState = () => inject(stateSymbol) as State;

export const useActions = () => {
  const router = useRouter();
  const signInApi = useSysFetch('/sign-in', { immediate: false }).json();
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
      }
    },
  };

  return actions;
};

export const useComputeds = () => {
  const state = useState();

  const computeds = {};

  return computeds;
};

export default () => defineContext(stateSymbol, createState);
