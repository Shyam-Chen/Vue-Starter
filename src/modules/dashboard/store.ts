import { reactive, inject } from 'vue';

import { defineContext } from '~/composables';

import type { State } from './types';

export const stateSymbol = Symbol('/dashboard');

export const createState = reactive({
  errors: {},
});

export const useState = () => inject(stateSymbol) as State;

export const useActions = () => {
  const state = useState();

  const actions = {};

  return actions;
};

export const useComputeds = () => {
  const state = useState();

  const computeds = {};

  return computeds;
};

export default () => defineContext(stateSymbol, createState);
