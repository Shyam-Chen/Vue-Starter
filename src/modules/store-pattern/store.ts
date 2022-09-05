import { computed, reactive, watch, provide, inject } from 'vue';

import type { State } from './type';

export const stateSymbol = Symbol('counter');

export const createState = reactive({
  count: 0,
  prevCount: null,
});

export const useState = () => inject(stateSymbol) as State;

export const useActions = () => {
  const state = useState();

  const actions = {
    increment() {
      state.count += 1;
    },
    decrement() {
      state.count -= 1;
    },
    setCount(val: number) {
      state.count = val;
    },
    resetCount() {
      actions.setCount(0);
    },
  };

  return actions;
};

export const useComputeds = () => {
  const state = useState();

  const computeds = {
    evenOrOdd: computed(() => (state.count % 2 === 0 ? 'Even' : 'Odd')),
  };

  return computeds;
};

export const useReactions = () => {
  const state = useState();

  watch(
    () => state.count,
    (val, oldVal) => {
      state.prevCount = oldVal;
    },
  );
};

export default () => provide(stateSymbol, createState);
