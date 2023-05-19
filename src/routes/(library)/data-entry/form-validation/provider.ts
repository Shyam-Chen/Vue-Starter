import { reactive, inject } from 'vue';

import { defineContext } from '~/composables';

import type { State } from './types';

export const stateSymbol = Symbol('/forms/form-validation');

export const createState = reactive({
  yupForm: {},
  yupValdn: {},

  zodForm: {},
  zodValdn: {},
});

export const useState = () => inject(stateSymbol) as State;

export const useActions = () => {
  const state = useState();

  const actions = {
    async submit() {
      console.log('yupForm =', state.yupForm);
      console.log('zodForm =', state.zodForm);
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
