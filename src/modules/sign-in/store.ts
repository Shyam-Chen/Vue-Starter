import { reactive, inject } from 'vue';
import { useRouter } from 'vue-router';

import { defineContext } from '~/composables';

import type { State } from './types';

export const stateSymbol = Symbol('/form-validation');

export const createState = reactive({
  signInForm: {},

  errors: {},
});

export const useState = () => inject(stateSymbol) as State;

export const useActions = () => {
  const router = useRouter();
  const state = useState();

  const actions = {
    signIn() {
      console.log('Sign In', state.signInForm);
      sessionStorage.setItem('token', 'xxx');
      router.push('/dashboard');
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
