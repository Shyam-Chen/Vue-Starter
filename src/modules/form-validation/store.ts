import { reactive, inject } from 'vue';

import { defineContext } from '~/composables';

import type { State } from './types';

export const stateSymbol = Symbol('/form-validation');

export const createState = reactive({
  basicForms: {},

  errors: {},
});

export const useState = () => inject(stateSymbol) as State;

export const useActions = () => {
  const state = useState();

  const actions = {
    signIn() {
      console.log('Sign In', state.basicForms);
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
