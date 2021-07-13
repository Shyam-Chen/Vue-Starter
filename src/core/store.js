import { reactive, inject, computed } from 'vue';

const stateSymbol = Symbol('state');

const createState = reactive({
  count: 0,
});

export const useState = () => inject(stateSymbol);

export const useActions = () => {
  const state = useState();

  return {
    incrementCount() {
      state.count += 1;
    },
  };
};

export const useComputeds = () => {
  const state = useState();

  return {
    evenOrOdd: computed(() => (state.count % 2 === 0 ? 'Even' : 'Odd')),
  };
};

export const store = {
  install(app) {
    app.provide(stateSymbol, createState);
  },
};
