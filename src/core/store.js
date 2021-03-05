import { reactive, provide, inject } from 'vue';

const state = {
  foo: 'foo',
  bar: 'bar',
};

export const stateSymbol = Symbol('state');
export const createState = () => reactive(state);
export const useState = () => inject(stateSymbol);
export const provideState = () => provide(stateSymbol, createState());
